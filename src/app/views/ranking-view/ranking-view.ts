import { Component, inject, OnInit } from '@angular/core';
import { Player } from '../../models/player.model';
import { PlayerService } from '../../services/player.service';
import { TranslatePipe } from '@ngx-translate/core';
import { LowerCasePipe } from '@angular/common';
import { ChampionsService } from '../../services/champion.service';
import { environment } from '../../../environments/environment';

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

  players: Player[] | null = null;

  ngOnInit() {
    this.playerService.getPlayers().subscribe({
      next: (data) => {
        this.players = data;
      },
      error: () => {
        this.players = [];
      },
    });
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
}
