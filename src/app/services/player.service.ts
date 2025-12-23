import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, Observable} from 'rxjs';
import {PlayerDetail} from '../models/player-detail.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/api/players`;

  getPlayerByPuuid(puuid: string): Observable<PlayerDetail>{
    return this.http.get<PlayerDetail>(`${this.baseUrl}/${puuid}`)
      .pipe(map(player => new PlayerDetail(player)));
  }
}
