import type { Destination, Interest } from '../types/destination'

export type Budget = 'Budget' | 'Moderate' | 'Premium'
export type CrowdPreference = 'Avoid crowded' | 'Balanced' | 'Crowds are okay'
export type Duration = 'Half day' | '1 day' | '2 days' | '3 days'
export type Pace = 'Relaxed' | 'Balanced' | 'Fast-paced'
export type Transport = 'Walking' | 'Public transport' | 'Two-wheeler' | 'Car'

export type Preferences = {
  interests: Interest[]
  budget: Budget
  crowd: CrowdPreference
  duration: Duration
  pace: Pace
  transport: Transport
  startId: string
}

export type PlannedStop = {
  destination: Destination
  travelKm: number
  travelMinutes: number
  travelCost: number
  reason: string
}