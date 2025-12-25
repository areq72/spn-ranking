import { Component, inject, input } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-player-detail-view',
  imports: [],
  templateUrl: './player-detail-view.html',
  styleUrl: './player-detail-view.css',
})
export class PlayerDetailView {
  private readonly playerService = inject(PlayerService);
  readonly environment = environment;

  puuid = input.required<string>();

  playerRs = this.playerService.getPlayerByUuidRs(this.puuid);
}
