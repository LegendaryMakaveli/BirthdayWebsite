
export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface SisterProfile {
  name: string;
  theme: 'yellow' | 'pink';
}

export interface PhotoData {
  url: string;
  caption: string;
  message?: string;
}
