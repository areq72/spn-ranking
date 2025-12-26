import { Component, computed, inject, input } from '@angular/core';
import { ChampionMastery } from '../../models/player.model';
import { ChampionsService } from '../../services/champion.service';

@Component({
  selector: 'app-champion-mastery-card',
  imports: [],
  templateUrl: './champion-mastery-card.html',
  styleUrl: './champion-mastery-card.css',
})
export class ChampionMasteryCard {
  private readonly champService = inject(ChampionsService);

  readonly mastery = input<ChampionMastery>();

  splashUrl = computed(() => {
    const championId = this.mastery()?.championId;
    if (!championId) return '';
    return this.champService.getChampionLoadingScreenById(championId);
  });
}
