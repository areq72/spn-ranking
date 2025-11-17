import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChampionsService {

  private http = inject(HttpClient);

  champions$ = this.http
    .get<any>('https://ddragon.leagueoflegends.com/cdn/15.22.1/data/en_US/champion.json')
    .pipe(
      map(data => Object.values(data.data)),
      shareReplay(1)
    );

  getChampionNameById(id: number) {
    return this.champions$.pipe(
      map((champs: any[]) => champs.find((c: any) => Number(c.key) === id)?.id ?? null)
    );
  }
}
