export type ResourceType = 'water' | 'energy' | 'waste'
export type ReadingSource = 'demo' | 'manual' | 'simulated-device' | 'connected-device'
export type Channel = 'manual' | 'simulated-device' | 'connected-device'

export type RawReading = {
  hotelId?: unknown
  resource?: unknown
  value?: unknown
  unit?: unknown
  deviceId?: unknown
  recordedAt?: unknown
}

export type Reading = {
  id: string
  hotelId: string
  resource: ResourceType
  value: number
  unit: string
  deviceId: string | null
  recordedAt: string
  source: ReadingSource
}

export type IngestResult =
  | { status: 'saved'; reading: Reading }
  | { status: 'duplicate'; reading: Reading }
  | { status: 'invalid'; errors: string[] }
  | { status: 'rejected'; errors: string[] }
  | { status: 'failed'; message: string }