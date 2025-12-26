import { Component, computed, input } from '@angular/core';
import {environment} from "../../../environments/environment";
import { ProfileInfo } from '../../models/player.model';

@Component({
  selector: 'app-summoner-icon',
  imports: [],
  templateUrl: './summoner-icon.html',
  styleUrl: './summoner-icon.css',
})
export class SummonerIcon {
  protected readonly environment = environment;

  readonly profileInfo = input<ProfileInfo>();
  readonly smallIcon = input<boolean>(false);

  readonly borderUrl = computed(() => {
    const level = this.profileInfo()?.summonerLevel ?? 1;
    const safeLevel = Math.max(level, 1);

    const theme = Math.min(Math.floor(safeLevel / 25) + 1, 21);

    return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/uikit/themed-borders/theme-${theme}-border.png`;
  });

  readonly iconUrl = computed(() => {
    return (
      'https://ddragon.leagueoflegends.com/cdn/' +
      environment.lolPatch +
      '/img/profileicon/' +
      this.profileInfo()?.profileIconId +
      '.png'
    );
  })
}
