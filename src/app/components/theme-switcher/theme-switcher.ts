import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { AppTheme } from '../../constants/constants';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.css',
})
export class ThemeSwitcher {
  themeService = inject(ThemeService);

  isWinter = computed(() => {
    return this.themeService.currentTheme() === 'winter';
  });

  onToggle(checked: boolean) {
    const theme: AppTheme = checked ? 'winter' : 'default';
    this.themeService.setTheme(theme);
  }
}
