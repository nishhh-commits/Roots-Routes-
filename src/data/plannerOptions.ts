import type { Interest } from '../types/destination'
import type {
  CrowdPreference,
  Pace,
  Preferences,
  Transport,
} from '../types/planner'

export const dayOptions = [1, 2, 3]

export const hourOptions = [3, 4, 6, 8]

export const budgetOptions = [1000, 2500, 4000, 6000]

export const interests: Interest[] = [
  'Heritage',
  'Local art',
  'Culture',
  'Food',
  'Nature',
  'Shopping',
  'Photography',
  'Relaxation',
]

export const paces: Pace[] = [
  'Relaxed',
  'Balanced',
  'Fast-paced',
]

export const crowdPreferences: CrowdPreference[] = [
  'Avoid crowded',
  'Balanced',
  'Crowds are okay',
]

export const transports: Transport[] = [
  'Walking',
  'Public transport',
  'Two-wheeler',
  'Car',
]

export const demoPreferences: Preferences = {
  cityId: 'udaipur',
  startId: 'jagdish-temple',
  days: 1,
  hoursPerDay: 6,
  budget: 2500,
  interests: ['Heritage', 'Local art'],
  pace: 'Relaxed',
  crowd: 'Balanced',
  transport: 'Two-wheeler',
}