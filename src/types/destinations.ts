export interface Destination {
  id: string;
  name: string;
  area: string;
  interests: string[];
  entryCost: number;
  visitMinutes: number;
  typicalCrowd: number;
  lat: number;
  lng: number;
}