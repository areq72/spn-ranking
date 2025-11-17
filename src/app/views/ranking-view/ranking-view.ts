import {Component, inject, OnInit} from '@angular/core';
import {Player} from '../../models/player.model';
import {PlayerService} from '../../services/player.service';
import {TranslatePipe} from '@ngx-translate/core';
import {DecimalPipe, LowerCasePipe} from '@angular/common';
import {ChampionsService} from '../../services/champion.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-ranking-view',
  imports: [TranslatePipe, LowerCasePipe, DecimalPipe],
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

  getChampionIcon(id: number) {
    if (this.championCache.has(id)) {
      return this.buildChampionUrl(this.championCache.get(id)!);
    }

    this.champsService.getChampionNameById(id).subscribe((name) => {
      if (name) this.championCache.set(id, name);
    });

    return '/assets/placeholder.png';
  }

  private buildChampionUrl(championName: string) {
    return `https://ddragon.leagueoflegends.com/cdn/15.22.1/img/champion/${championName}.png`;
  }
}
