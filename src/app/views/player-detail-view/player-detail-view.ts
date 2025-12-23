import {Component, inject} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {ActivatedRoute} from '@angular/router';
import {distinctUntilChanged, filter, map, switchMap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-player-detail-view',
  imports: [],
  templateUrl: './player-detail-view.html',
  styleUrl: './player-detail-view.css',
})
export class PlayerDetailView {
  private readonly playerService = inject(PlayerService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly puuid$ = this.activatedRoute.paramMap.pipe(
    map((p) => p.get('puuid')),
    filter((v): v is string => v !== null && v.trim().length > 0),
    distinctUntilChanged(),
  );

  player = toSignal(
    this.puuid$.pipe(
      switchMap((id) => this.playerService.getPlayerByPuuid(id)),
    ),
    { initialValue: null },
  );
}
