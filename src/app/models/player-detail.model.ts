import {ChampionMastery, ProfileInfo, QueueInfo} from './player.model';
import {QueueType} from '../constants/constants';

export class RankHistory {
  soloQ!: QueueInfo;
  flexQ!: QueueInfo;
  date!: Date;

  constructor(partial: Partial<RankHistory>) {
    Object.assign(this, partial);

    this.date = partial.date ? new Date(partial.date) : new Date();
  }
}

export class PlayerDetail {
  name!: string;
  puuid!: string;
  summonerName!: string;
  summonerTag!: string;

  soloQ!: QueueInfo;
  flexQ!: QueueInfo;

  profileInfo!: ProfileInfo;
  masteries!: ChampionMastery[];

  lastUpdated!: string;

  history: RankHistory[];

  constructor(partial: Partial<PlayerDetail>) {
    Object.assign(this, partial);

    this.masteries = partial.masteries
      ? partial.masteries.sort((a, b) => b.championPoints - a.championPoints)
      : [];
    this.history = partial.history
      ? partial.history.map(history => new RankHistory(history))
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
