import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarMessage } from './components/top-bar-message/top-bar-message';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarMessage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  themeService = inject(ThemeService);

  logo = signal<string>('spn-logo-winter.svg');

  ngOnInit(): void {
    this.themeService.setTheme('winter');
  }
}
