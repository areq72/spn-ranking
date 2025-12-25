import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Player } from '../models/player.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private baseUrl = `${environment.baseUrl}/api/league`;

  getPlayersRs() {
    return httpResource<Player[]>(() => ({
      url: `${this.baseUrl}/players`,
    }));
  }
}
