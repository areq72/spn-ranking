import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Player} from '../models/player.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/api/league`;

  getPlayers() {
    return this.http.get<Player[]>(`${this.baseUrl}/players`);
  }
}
