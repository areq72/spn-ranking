import {Component, inject, OnInit} from '@angular/core';
import {Player} from '../../models/player.model';
import {PlayerService} from '../../services/player.service';
import {TranslatePipe} from '@ngx-translate/core';
import {LowerCasePipe} from '@angular/common';

@Component({
  selector: 'app-ranking-view',
  imports: [TranslatePipe, LowerCasePipe],
  templateUrl: './ranking-view.html',
  styleUrl: './ranking-view.css',
})
export class RankingView implements OnInit {
  private playerService = inject(PlayerService);

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
}
