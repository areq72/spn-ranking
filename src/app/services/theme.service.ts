import { computed, Injectable, signal } from '@angular/core';
import { AppTheme } from '../constants/constants';
import { defaultChartStyles, winterChartStyles } from '../models/chart-styles.model';

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

  chartStyles = computed(() => {
    switch (this.currentTheme()) {
      case 'winter':
        return winterChartStyles;
      default:
        return defaultChartStyles;
    }
  })
}
