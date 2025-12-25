import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Clash } from '../models/clash.model';

@Injectable({
  providedIn: 'root',
})
export class ClashService {
  private baseUrl = `${environment.baseUrl}/api/clash`;

  getNextClashRs() {
    return httpResource<Clash>(() => ({
      url: `${this.baseUrl}/next-clash`,
    }));
  }
}
