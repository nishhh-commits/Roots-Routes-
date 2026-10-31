import type { Interest, Destination } from './destination'
import type { CrowdLevel } from './crowd'

export type CrowdPreference =
  | 'Avoid crowded'
  | 'Balanced'
  | 'Crowds are okay'

export type Pace = 'Relaxed' | 'Balanced' | 'Fast-paced'

export type Transport =
  | 'Walking'
  | 'Public transport'
  | 'Two-wheeler'
  | 'Car'

export type Preferences = {
  cityId: string
  startId: string
  days: number
  hoursPerDay: number
  budget: number
  interests: Interest[]
  pace: Pace
  crowd: CrowdPreference
  transport: Transport
}

export type Reason = {
  kind:
    | 'interest'
    | 'local'
    | 'time'
    | 'budget'
    | 'crowd'
    | 'proximity'
    | 'pace'
  text: string
}

export type PlannedStop = {
  destination: Destination
  level: CrowdLevel
  startTime: string
  visitMinutes: number
  travelKm: number
  travelMinutes: number
  travelCost: number
  reason: string
  reasons: Reason[]
}

export type Check = {
  ok: boolean
  text: string
}