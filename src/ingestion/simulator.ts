import type { Reading, ReadingResource } from '../types/reading'

const SIMULATED_DEVICE_ID = 'SIM-DEVICE-001'

const resourceUnits: Record<ReadingResource, string> = {
  water: 'kL',
  energy: 'kWh',
  waste: 'kg',
}

export function createSimulatedReading(
  hotelId: string,
  resource: ReadingResource = 'water',
  value = 100,
  recordedAt: Date = new Date(),
): Reading {
  if (!hotelId.trim()) {
    throw new Error('Hotel ID is required.')
  }

  if (!Number.isFinite(value) || value < 0) {
    throw new Error('Simulated value must be non-negative and finite.')
  }

  if (!(recordedAt instanceof Date) || Number.isNaN(recordedAt.getTime())) {
    throw new Error('A valid date is required.')
  }

  const timestamp = recordedAt.toISOString()

  return {
    id: `SIM-${hotelId}-${resource}-${timestamp}`,
    hotelId,
    resource,
    value,
    unit: resourceUnits[resource],
    deviceId: SIMULATED_DEVICE_ID,
    recordedAt: timestamp,
    source: 'demo',
  }
}