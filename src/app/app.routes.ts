import { Routes } from '@angular/router';
import { RankingView } from './views/ranking-view/ranking-view';
import {PlayerDetailView} from './views/player-detail-view/player-detail-view';

export const routes: Routes = [
  {
    path: '',
    component: RankingView,
  },
  {
    path: 'player/:puuid',
    component: PlayerDetailView
  }
];
