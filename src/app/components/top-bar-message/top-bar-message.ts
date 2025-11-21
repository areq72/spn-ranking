import { Component, computed, effect, inject, signal } from '@angular/core';
import { ClashService } from '../../services/clash.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-top-bar-message',
  imports: [TranslatePipe],
  templateUrl: './top-bar-message.html',
  styleUrl: './top-bar-message.css',
})
export class TopBarMessage {
  private clashService = inject(ClashService);

  nextClash = signal<Date | null>(null);

  now = signal(Date.now());

  private ticker = effect(() => {
    const interval = setInterval(() => {
      this.now.set(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  });

  countdown = computed(() => {
    const target = this.nextClash();
    if (!target) return 'Loading...';

    const diff = target.getTime() - this.now();

    if (diff <= 0) return 'Clash starting!';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return (
      `${hours.toString().padStart(2, '0')}h ` +
      `${minutes.toString().padStart(2, '0')}m ` +
      `${seconds.toString().padStart(2, '0')}s`
    );
  });

  constructor() {
    this.loadNextClash();
  }

  private loadNextClash() {
    this.clashService.getNextClash().subscribe({
      next: (clash) => {
        this.nextClash.set(new Date(clash.schedule[0]?.startTime));
      },
      error: () => {
        this.nextClash.set(null);
      },
    });
  }
}
