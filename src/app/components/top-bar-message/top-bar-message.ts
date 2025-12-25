import { Component, computed, effect, inject, signal } from '@angular/core';
import { ClashService } from '../../services/clash.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-bar-message',
  imports: [TranslatePipe],
  templateUrl: './top-bar-message.html',
  styleUrl: './top-bar-message.css',
})
export class TopBarMessage {
  private clashService = inject(ClashService);
  private translate = inject(TranslateService);

  nextClashRs = this.clashService.getNextClashRs();

  nextClash = computed(() => {
    const raw = this.nextClashRs.value()?.schedule[0]?.registrationTime;
    return !raw ? null : new Date(raw);
  });

  now = signal(Date.now());

  private ticker = effect(() => {
    const interval = setInterval(() => {
      this.now.set(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  });

  countdown = computed(() => {
    const target = this.nextClash();
    if (!target) return null;

    const diff = target.getTime() - this.now();

    if (diff <= 0) return this.translate.instant('ribbon.clashInProgress');

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = Math.floor(totalSeconds % 60);


    return (
      `${this.translate.instant('ribbon.nextClashIn')} ` +
      `${days ? `${days.toString()}d ` : ''}` +
      `${hours.toString().padStart(2, '0')}h ` +
      `${minutes.toString().padStart(2, '0')}m ` +
      `${seconds.toString().padStart(2, '0')}s`
    );
  });

}
