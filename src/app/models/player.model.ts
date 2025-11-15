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

export interface Player {
  name: string;
  puuid: string;
  summonerName: string;
  summonerTag: string;

  soloQ: QueueInfo;
  flexQ: QueueInfo;

  profileInfo: ProfileInfo;

  lastUpdated: string;
}
