import { Component, computed, inject, signal } from '@angular/core';
import { Player } from '../../models/player.model';
import { LeagueService } from '../../services/league.service';
import { TranslatePipe } from '@ngx-translate/core';
import { QueueType } from '../../constants/constants';
import { compareElo } from '../../utils/tier-utils';
import { PlayerCard } from '../../components/player-card/player-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking-view',
  imports: [TranslatePipe, PlayerCard],
  templateUrl: './ranking-view.html',
  styleUrl: './ranking-view.css',
})
export class RankingView {
  private leagueService = inject(LeagueService);
  private router = inject(Router);

  playersRs = this.leagueService.getPlayersRs();

  isReordering = signal(false);
  queueType = signal<QueueType>('soloQ');

  sortedPlayers = computed(() => {
    const players = this.playersRs.value();
    if (!players) return null;
    return [...players]
      .map((p) => new Player(p))
      .sort((a, b) => compareElo(a, b, this.queueType()));
  });

  switchQueue(queue: QueueType) {
    if (this.queueType() === queue) return;
    this.queueType.set(queue);
  }

  navigateToDetail(player: Player) {
    this.router.navigate(['player', player.puuid]).then();
  }
}
