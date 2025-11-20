import { Component, computed, inject, input, Input, signal } from '@angular/core';
import { Player } from '../../models/player.model';
import { ChampionsService } from '../../services/champion.service';
import { environment } from '../../../environments/environment';
import { QueueType } from '../../constants/constants';
import { LowerCasePipe } from '@angular/common';
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'app-player-card',
  imports: [LowerCasePipe, TranslatePipe],
  templateUrl: './player-card.html',
  styleUrl: './player-card.css',
})
export class PlayerCard {
  protected readonly environment = environment;

  private championsService = inject(ChampionsService);

  player = input<Player>();
  rank = input<number>();
  queue = input<QueueType>();

  splashUrl = computed(() => {
    const id = this.player()?.highestMastery?.championId;
    if (id == null) return '';
    return this.championsService.getChampionSplashById(id);
  });
}
