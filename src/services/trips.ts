import type { Preferences } from '../types/planner'

export type SavedTrip = {
  id: string
  name: string
  savedOn: string
  prefs: Preferences
  days: string[][]
}

const KEY = 'rr-saved-trips'

export function loadTrips(): SavedTrip[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as SavedTrip[]) : []
  } catch {
    return []
  }
}

function write(trips: SavedTrip[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(trips))
  } catch {
    return
  }
}

export function saveTrip(trip: SavedTrip) {
  write([trip, ...loadTrips()])
}

export function deleteTrip(id: string) {
  write(loadTrips().filter((trip) => trip.id !== id))
}