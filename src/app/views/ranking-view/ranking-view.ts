import { Component, inject, OnInit } from '@angular/core';
import { Player } from '../../models/player.model';
import { PlayerService } from '../../services/player.service';
import { TranslatePipe } from '@ngx-translate/core';
import { LowerCasePipe } from '@angular/common';
import { ChampionsService } from '../../services/champion.service';
import { environment } from '../../../environments/environment';
import { catchError, finalize } from 'rxjs';
import { QueueType } from '../../constants/constants';
import { compareElo } from '../../utils/tier-utils';

@Component({
  selector: 'app-ranking-view',
  imports: [TranslatePipe, LowerCasePipe],
  templateUrl: './ranking-view.html',
  styleUrl: './ranking-view.css',
})
export class RankingView implements OnInit {
  protected readonly environment = environment;

  private playerService = inject(PlayerService);
  private champsService = inject(ChampionsService);

  private championCache = new Map<number, string>();

  players: Player[] = [];
  loadingPlayers = false;
  isReordering = false;
  queueType: QueueType = 'soloQ';

  ngOnInit() {
    this.getPlayers();
  }

  switchQueue(queue: QueueType) {
    this.queueType = queue;
    this.sortPlayers();
    this.playReorderAnimation();
  }

  getChampionSplash(championId: number): string {
    this.champsService.getChampionNameById(championId).subscribe((name) => {
      if (name) this.championCache.set(championId, name);
    });

    const championName = this.championCache.get(championId);
    if (!championName) {
      return '';
    }

    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`;
  }

  private getPlayers() {
    this.loadingPlayers = true;
    this.playerService
      .getPlayers()
      .pipe(
        finalize(() => (this.loadingPlayers = false)),
        catchError(() => (this.players = [])),
      )
      .subscribe({
        next: (data) => {
          this.players = data;
        },
      });
  }

  private sortPlayers() {
    this.players.sort((a, b) => compareElo(a, b, this.queueType));
  }

  private playReorderAnimation() {
    this.isReordering = false;

    requestAnimationFrame(() => {
      this.isReordering = true;

      setTimeout(() => {
        this.isReordering = false;
      }, 300);
    });
  }
}
