import type { Interest } from '../types/destination'
import type { Budget, CrowdPreference, Duration, Pace, Transport } from '../types/planner'

export const durations: Duration[] = ['Half day', '1 day', '2 days', '3 days']
export const interests: Interest[] = ['Heritage', 'Culture', 'Food', 'Nature', 'Shopping', 'Photography', 'Relaxation']
export const budgets: Budget[] = ['Budget', 'Moderate', 'Premium']
export const paces: Pace[] = ['Relaxed', 'Balanced', 'Fast-paced']
export const crowdPreferences: CrowdPreference[] = ['Avoid crowded', 'Balanced', 'Crowds are okay']
export const transports: Transport[] = ['Walking', 'Public transport', 'Two-wheeler', 'Car']