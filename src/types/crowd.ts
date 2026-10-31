export type CrowdLevel = 'Low' | 'Moderate' | 'High'
export type Confidence = 'Low' | 'Medium' | 'High'

export type CrowdReport = {
  destinationId: string
  name: string
  area: string
  level: CrowdLevel
  minutesAgo: number
  reports: number
  confidence: Confidence
  alternativeIds: string[]
}