import { Component, computed, inject, signal } from '@angular/core';
import { Player } from '../../models/player.model';
import { PlayerService } from '../../services/player.service';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { QueueType } from '../../constants/constants';
import { compareElo } from '../../utils/tier-utils';
import { PlayerCard } from '../../components/player-card/player-card';

@Component({
  selector: 'app-ranking-view',
  imports: [TranslatePipe, PlayerCard],
  templateUrl: './ranking-view.html',
  styleUrl: './ranking-view.css',
})
export class RankingView {
  private playerService = inject(PlayerService);

  players = signal<Player[]>([]);
  loadingPlayers = signal(false);
  isReordering = signal(false);
  queueType = signal<QueueType>('soloQ');

  sortedPlayers = computed(() =>
    [...this.players()].sort((a, b) => compareElo(a, b, this.queueType())),
  );

  constructor() {
    this.getPlayers();
  }

  switchQueue(queue: QueueType) {
    if (this.queueType() === queue) return;
    this.queueType.set(queue);
    this.playReorderAnimation();
  }

  private getPlayers() {
    this.loadingPlayers.set(true);

    this.playerService
      .getPlayers()
      .pipe(
        catchError(() => {
          this.players.set([]);
          return of([]);
        }),
        finalize(() => this.loadingPlayers.set(false)),
      )
      .subscribe((data) => {
        this.players.set(data);
      });
  }

  private playReorderAnimation() {
    this.isReordering.set(false);

    requestAnimationFrame(() => {
      this.isReordering.set(true);

      setTimeout(() => {
        this.isReordering.set(false);
      }, 300);
    });
  }
}
