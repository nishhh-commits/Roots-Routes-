import { crowdReports } from '../data/heritage'
import { destinations } from '../data/destinations'
import type { CrowdLevel } from '../types/crowd'

const typical: Record<1 | 2 | 3, CrowdLevel> = { 1: 'Low', 2: 'Moderate', 3: 'High' }

export const crowdRank: Record<CrowdLevel, number> = { Low: 1, Moderate: 2, High: 3 }

export function crowdLevel(destinationId: string): CrowdLevel {
  const report = crowdReports.find((item) => item.destinationId === destinationId)
  if (report) {
    return report.level
  }
  const place = destinations.find((item) => item.id === destinationId)
  return place ? typical[place.typicalCrowd] : 'Moderate'
}