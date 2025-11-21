export interface ScheduleItem {
  id: number;
  registrationTime: string;
  startTime: string;
  cancelled: boolean;
}

export interface Clash {
  _id?: string;
  id: number;
  themeId: number;
  nameKey: string;
  nameKeySecondary: string;
  schedule: ScheduleItem[];
  createdAt?: string;
  updatedAt?: string;
}
