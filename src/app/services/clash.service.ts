import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Clash } from '../models/clash.model';

@Injectable({
  providedIn: 'root',
})
export class ClashService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/api/clash`;

  getNextClash(): Observable<Clash> {
    return this.http.get<Clash>(`${this.baseUrl}/next-clash`);
  }
}
