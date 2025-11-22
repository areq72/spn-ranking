import { QueueType } from '../constants/constants';

export interface QueueInfo {
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

export interface ProfileInfo {
  summonerLevel: number;
  profileIconId: number;
}

export interface ChampionMastery {
  championId: number;
  championLevel: number;
  championPoints: number;
}

export class Player {
  name!: string;
  puuid!: string;
  summonerName!: string;
  summonerTag!: string;

  soloQ!: QueueInfo;
  flexQ!: QueueInfo;

  profileInfo!: ProfileInfo;
  masteries!: ChampionMastery[];

  lastUpdated!: string;

  lpDiff!: { [key: string]: number }

  constructor(partial: Partial<Player>) {
    Object.assign(this, partial);

    this.masteries = partial.masteries
      ? partial.masteries.sort((a, b) => b.championPoints - a.championPoints)
      : [];
  }

  get highestMastery(): ChampionMastery | null {
    return this.masteries[0] ?? null;
  }

  getQueue(queue: QueueType): QueueInfo {
    return queue === 'flexQ' ? this.flexQ : this.soloQ;
  }

  navigateToOPGG() {
    const region = 'euw';

    const gameName = encodeURIComponent(this.summonerName);
    const tagLine = encodeURIComponent(this.summonerTag);

    const url = `https://op.gg/lol/summoners/${region}/${gameName}-${tagLine}`;

    window.open(url, '_blank', 'noopener');
  }
}
