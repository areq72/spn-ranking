import { Component, inject, OnInit } from '@angular/core';
import { Player } from '../../models/player.model';
import { PlayerService } from '../../services/player.service';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { catchError, finalize } from 'rxjs';
import { QueueType } from '../../constants/constants';
import { compareElo } from '../../utils/tier-utils';
import { PlayerCard } from '../../components/player-card/player-card';

@Component({
  selector: 'app-ranking-view',
  imports: [TranslatePipe, PlayerCard],
  templateUrl: './ranking-view.html',
  styleUrl: './ranking-view.css',
})
export class RankingView implements OnInit {
  protected readonly environment = environment;

  private playerService = inject(PlayerService);

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
