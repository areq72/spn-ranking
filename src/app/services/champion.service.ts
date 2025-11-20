import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ChampionsService {
  private http = inject(HttpClient);

  champions = toSignal(
    this.http
      .get<any>(
        `https://ddragon.leagueoflegends.com/cdn/${environment.lolPatch}/data/en_US/champion.json`,
      )
      .pipe(map((data) => Object.values(data.data))),
    { initialValue: [] as any[] },
  );

  getChampionNameById(id: number): string | null {
    const champs = this.champions();
    return champs.find((c: any) => Number(c.key) === id)?.id ?? null;
  }

  getChampionSplashById(championId: number): string {
    const name = this.getChampionNameById(championId);
    return name ? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg` : '';
  }
}
