import { Injectable, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PlayerDetail } from '../models/player-detail.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private baseUrl = `${environment.baseUrl}/api/players`;

  getPlayerByUuidRs(puuid: Signal<string>) {
    return httpResource<PlayerDetail>(
      () => ({ url: `${this.baseUrl}/${puuid()}` }),
      { parse: (p: any) => new PlayerDetail(p),
    });
  }
}
