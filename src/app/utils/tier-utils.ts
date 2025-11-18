import {Player} from '../models/player.model';
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
