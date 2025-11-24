import { Injectable, signal } from '@angular/core';
import { AppTheme } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = signal<AppTheme>('default');

  setTheme(theme: AppTheme): void {
    if (this.currentTheme() === theme) return;

    this.currentTheme.set(theme);

    const root = document.documentElement;

    Array.from(root.classList)
      .filter(cls => cls.endsWith('-theme'))
      .forEach(cls => root.classList.remove(cls));

    if (theme !== 'default') {
      root.classList.add(`${theme}-theme`);
    }
  }
}
