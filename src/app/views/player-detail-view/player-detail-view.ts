import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { environment } from '../../../environments/environment';
import { WinrateChart } from '../../components/charts/winrate-chart/winrate-chart';
import { QueueType } from '../../constants/constants';
import { RankHistoryChart } from '../../components/charts/rank-history-chart/rank-history-chart';
import { ChampionMasteryCard } from '../../components/champion-mastery-card/champion-mastery-card';

@Component({
  selector: 'app-player-detail-view',
  imports: [WinrateChart, RankHistoryChart, ChampionMasteryCard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './player-detail-view.html',
  styleUrl: './player-detail-view.css',
})
export class PlayerDetailView {
  private readonly playerService = inject(PlayerService);
  readonly environment = environment;
  readonly queueTypes: QueueType[] = ['soloQ', 'flexQ'];

  puuid = input.required<string>();

  borderUrl = computed(() => {
    const level = this.playerRs.value()?.profileInfo?.summonerLevel ?? 1;
    const safeLevel = Math.max(level, 1);

    const theme = Math.min(Math.floor(safeLevel / 25) + 1, 21);

    return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/uikit/themed-borders/theme-${theme}-border.png`;
  });

  playerRs = this.playerService.getPlayerByUuidRs(this.puuid);
}
