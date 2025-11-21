import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarMessage } from './components/top-bar-message/top-bar-message';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarMessage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('spn-ranking');
}
