import {Player, QueueInfo } from '../models/player.model';
import {QueueType} from '../constants/constants';


const TIER_ORDER: Record<string, number> = {
  CHALLENGER: 8,
  GRANDMASTER: 7,
  MASTER: 6,
  DIAMOND: 5,
  EMERALD: 4,
  PLATINUM: 3,
  GOLD: 2,
  SILVER: 1,
  BRONZE: 0,
  IRON: -1,
};

const DIVISION_ORDER: Record<string, number> = {
  I: 3,
  II: 2,
  III: 1,
  IV: 0,
};

export function compareElo(a: Player, b: Player, queue: QueueType): number {
  const qa = a.getQueue(queue);
  const qb = b.getQueue(queue);

  if (!qa && !qb) return 0;
  if (!qa) return 1;
  if (!qb) return -1;

  const tierA = TIER_ORDER[qa.tier] ?? -999;
  const tierB = TIER_ORDER[qb.tier] ?? -999;

  if (tierA !== tierB) {
    return tierB - tierA;
  }

  const divA = DIVISION_ORDER[qa.rank] ?? 0;
  const divB = DIVISION_ORDER[qb.rank] ?? 0;

  if (divA !== divB) {
    return divB - divA;
  }

  const lpA = qa.leaguePoints ?? 0;
  const lpB = qb.leaguePoints ?? 0;

  return lpB - lpA;
}

const ORDER_TO_TIER = Object.entries(TIER_ORDER).reduce<Record<number, string>>((acc, [k, v]) => {
  acc[v] = k;
  return acc;
}, {});

const ORDER_TO_DIVISION = Object.entries(DIVISION_ORDER).reduce<Record<number, string>>(
  (acc, [k, v]) => {
    acc[v] = k;
    return acc;
  },
  {},
);

export function getQueueScore(queue?: QueueInfo | null): number {
  if (!queue) return 0;

  const tierScore = (TIER_ORDER[queue.tier] ?? -999) * 400;
  const divisionScore = (DIVISION_ORDER[queue.rank] ?? 0) * 100;
  const lp = queue.leaguePoints ?? 0;

  return tierScore + divisionScore + lp;
}

export function scoreToRank(score: number): { tier: string; rank: string; lp: number } {
  const tierIdx = Math.floor(score / 400);
  const remTier = score - tierIdx * 400;

  const divIdx = Math.floor(remTier / 100);
  const lp = remTier - divIdx * 100;

  const tier = ORDER_TO_TIER[tierIdx] ?? 'UNKNOWN';
  const rank = ORDER_TO_DIVISION[divIdx] ?? 'UNKNOWN';

  return { tier, rank, lp: Math.max(0, Math.min(99, Math.round(lp))) };
}

export function formatRankLabel(tier: string, rank: string): string {
  return `${tier} ${rank}`;
}
