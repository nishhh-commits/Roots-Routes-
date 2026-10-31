export interface Indicator {
  name: string;
  value: number;
  unit: string;
  target: number;
  higherIsBetter: boolean;
}

export interface Breakdown {
  name: string;
  value: number;
}