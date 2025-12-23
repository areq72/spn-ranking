import {Component, computed, inject, signal} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {TopBarMessage} from './components/top-bar-message/top-bar-message';
import {ThemeService} from './services/theme.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map, startWith} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarMessage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private themeService = inject(ThemeService);
  private router = inject(Router);

  logo = signal<string>('spn-logo-winter.svg');
  currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );
  showLogo = computed(() => {
    return !this.currentUrl()?.includes('player')
  });

  constructor() {
    this.themeService.setTheme('winter');
  }
}
