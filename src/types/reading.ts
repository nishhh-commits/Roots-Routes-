export type ReadingResource = 'water' | 'energy' | 'waste'

export type ReadingSource = 'manual' | 'device' | 'demo'

export type Reading = {
  id: string
  hotelId: string
  resource: ReadingResource
  value: number
  unit: string
  deviceId: string | null
  recordedAt: string
  source: ReadingSource
}