import { destinations } from '../data/destinations'
import type { Destination } from '../types/destination'
import type { Budget, CrowdPreference, Duration, Pace, PlannedStop, Preferences, Transport } from '../types/planner'

const dayCount: Record<Duration, number> = { 'Half day': 1, '1 day': 1, '2 days': 2, '3 days': 3 }
const stopsPerDay: Record<Pace, number> = { Relaxed: 2, Balanced: 3, 'Fast-paced': 4 }
const costCap: Record<Budget, number> = { Budget: 300, Moderate: 700, Premium: Infinity }
const speedKmh: Record<Transport, number> = { Walking: 4, 'Public transport': 15, 'Two-wheeler': 25, Car: 25 }
const costPerKm: Record<Transport, number> = { Walking: 0, 'Public transport': 8, 'Two-wheeler': 5, Car: 15 }
const crowdWeight: Record<CrowdPreference, number> = { 'Avoid crowded': 2, Balanced: 0.5, 'Crowds are okay': 0 }

function distanceKm(a: Destination, b: Destination) {
  const rad = Math.PI / 180
  const dLat = (b.lat - a.lat) * rad
  const dLng = (b.lng - a.lng) * rad
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h)) * 1.3
}

function findStart(startId: string) {
  return destinations.find((item) => item.id === startId) ?? destinations[0]
}

function buildReason(prefs: Preferences, destination: Destination) {
  const matches = destination.interests.filter((item) => prefs.interests.includes(item))
  if (matches.length > 0) {
    return `Matches your interest in ${matches.join(' and ')}.`
  }
  return 'Fits your budget, pace and crowd preference.'
}

export function buildDay(prefs: Preferences, list: Destination[]): PlannedStop[] {
  let previous = findStart(prefs.startId)
  return list.map((destination) => {
    const travelKm = distanceKm(previous, destination)
    previous = destination
    return {
      destination,
      travelKm: Math.round(travelKm * 10) / 10,
      travelMinutes: Math.round((travelKm / speedKmh[prefs.transport]) * 60),
      travelCost: Math.round(travelKm * costPerKm[prefs.transport]),
      reason: buildReason(prefs, destination),
    }
  })
}

export function generateItinerary(prefs: Preferences, excludedIds: string[] = []): PlannedStop[][] {
  const start = findStart(prefs.startId)
  const days = dayCount[prefs.duration]
  const total = stopsPerDay[prefs.pace] * days
  const count = prefs.duration === 'Half day' ? Math.max(1, Math.round(total / 2)) : total

  const picked = destinations
    .filter((item) => !excludedIds.includes(item.id))
    .filter((item) => item.entryCost <= costCap[prefs.budget])
    .filter((item) => prefs.transport !== 'Walking' || distanceKm(start, item) <= 6)
    .map((item) => {
      const matches = item.interests.filter((interest) => prefs.interests.includes(interest)).length
      const score = matches * 3 - item.typicalCrowd * crowdWeight[prefs.crowd] - item.entryCost / 500
      return { item, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((entry) => entry.item)

  const ordered: Destination[] = []
  let current = start
  const remaining = [...picked]
  while (remaining.length > 0) {
    remaining.sort((a, b) => distanceKm(current, a) - distanceKm(current, b))
    const next = remaining.shift()
    if (!next) {
      break
    }
    ordered.push(next)
    current = next
  }

  const size = Math.max(1, Math.ceil(ordered.length / days))
  const result: PlannedStop[][] = []
  for (let index = 0; index < ordered.length; index += size) {
    result.push(buildDay(prefs, ordered.slice(index, index + size)))
  }
  return result
}

export function summarize(days: PlannedStop[][]) {
  const stops = days.flat()
  return {
    stops: stops.length,
    cost: stops.reduce((sum, stop) => sum + stop.destination.entryCost + stop.travelCost, 0),
    minutes: stops.reduce((sum, stop) => sum + stop.destination.visitMinutes + stop.travelMinutes, 0),
  }
}