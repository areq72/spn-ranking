import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { environment } from '../../../environments/environment';
import { WinrateChart } from '../../components/charts/winrate-chart/winrate-chart';
import { QueueType } from '../../constants/constants';
import { RankHistoryChart } from '../../components/charts/rank-history-chart/rank-history-chart';
import { ChampionMasteryCard } from '../../components/champion-mastery-card/champion-mastery-card';
import { SummonerIcon } from '../../components/summoner-icon/summoner-icon';

@Component({
  selector: 'app-player-detail-view',
  imports: [WinrateChart, RankHistoryChart, ChampionMasteryCard, SummonerIcon],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './player-detail-view.html',
  styleUrl: './player-detail-view.css',
})
export class PlayerDetailView {
  private readonly playerService = inject(PlayerService);
  readonly environment = environment;
  readonly queueTypes: QueueType[] = ['soloQ', 'flexQ'];

  puuid = input.required<string>();

  playerRs = this.playerService.getPlayerByUuidRs(this.puuid);
}
