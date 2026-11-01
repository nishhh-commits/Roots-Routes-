import { resourceUnits } from './validate'
import type { RawReading, ResourceType } from '../types/reading'

type Step = { resource: ResourceType; value: number; deviceId: string }

const script: Step[] = [
  { resource: 'water', value: 12.4, deviceId: 'SIM-WM-01' },
  { resource: 'energy', value: 310, deviceId: 'SIM-EM-01' },
  { resource: 'waste', value: 42, deviceId: 'SIM-WS-01' },
  { resource: 'water', value: 13.1, deviceId: 'SIM-WM-01' },
  { resource: 'energy', value: 295, deviceId: 'SIM-EM-01' },
  { resource: 'waste', value: 38, deviceId: 'SIM-WS-01' },
]

export function createSimulatedReading(sequence: number, hotelId: string, now: Date): RawReading {
  const step = script[((sequence % script.length) + script.length) % script.length]
  return {
    hotelId,
    resource: step.resource,
    value: step.value,
    unit: resourceUnits[step.resource],
    deviceId: step.deviceId,
    recordedAt: now.toISOString(),
  }
}