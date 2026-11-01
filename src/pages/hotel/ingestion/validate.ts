import type { Channel, RawReading, ResourceType } from '../types/reading'

export const resourceUnits: Record<ResourceType, string> = { water: 'kL', energy: 'kWh', waste: 'kg' }

export const resourceLimits: Record<ResourceType, { min: number; max: number }> = {
  water: { min: 0.1, max: 100 },
  energy: { min: 1, max: 2000 },
  waste: { min: 1, max: 500 },
}

const HOTEL_ID = /^[A-Za-z0-9_-]{1,64}$/
const DEVICE_ID = /^[A-Za-z0-9][A-Za-z0-9-]{2,31}$/
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000
const MAX_FUTURE_MS = 5 * 60 * 1000

export type Validated = {
  hotelId: string
  resource: ResourceType
  value: number
  unit: string
  deviceId: string | null
  recordedAt: string
}

export type ValidationResult = { ok: true; value: Validated } | { ok: false; errors: string[] }

function isResource(value: unknown): value is ResourceType {
  return value === 'water' || value === 'energy' || value === 'waste'
}

export function validateReading(raw: unknown, channel: Channel, now: Date): ValidationResult {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return { ok: false, errors: ['Reading must be an object.'] }
  }

  const input = raw as RawReading
  const errors: string[] = []

  if (Object.prototype.hasOwnProperty.call(raw, 'source')) {
    errors.push('The source is set by the ingestion channel and cannot be supplied.')
  }

  if (typeof input.hotelId !== 'string' || !HOTEL_ID.test(input.hotelId)) {
    errors.push('Hotel id is missing or invalid.')
  }

  const resource = input.resource
  if (!isResource(resource)) {
    errors.push('Resource must be water, energy or waste.')
  } else {
    if (input.unit !== resourceUnits[resource]) {
      errors.push(`Unit for ${resource} must be ${resourceUnits[resource]}.`)
    }
    const limits = resourceLimits[resource]
    if (typeof input.value !== 'number' || !Number.isFinite(input.value)) {
      errors.push('Value must be a finite number.')
    } else if (input.value < limits.min || input.value > limits.max) {
      errors.push(`Value for ${resource} must be between ${limits.min} and ${limits.max} ${resourceUnits[resource]}.`)
    }
  }

  let deviceId: string | null = null
  if (channel === 'manual') {
    if (input.deviceId !== undefined && input.deviceId !== null) {
      errors.push('Manual entries cannot carry a device id.')
    }
  } else if (typeof input.deviceId !== 'string' || !DEVICE_ID.test(input.deviceId)) {
    errors.push('Device id is missing or invalid.')
  } else if (channel === 'simulated-device' && !input.deviceId.startsWith('SIM-')) {
    errors.push('Simulated readings must use a device id starting with SIM-.')
  } else {
    deviceId = input.deviceId
  }

  let recordedAt = ''
  if (typeof input.recordedAt !== 'string' || Number.isNaN(Date.parse(input.recordedAt))) {
    errors.push('Timestamp must be a valid date string.')
  } else {
    const time = Date.parse(input.recordedAt)
    if (time > now.getTime() + MAX_FUTURE_MS) {
      errors.push('Timestamp is in the future.')
    } else if (time < now.getTime() - MAX_AGE_MS) {
      errors.push('Timestamp is older than 7 days.')
    }
    recordedAt = new Date(time).toISOString()
  }

  if (errors.length > 0 || !isResource(resource)) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    value: {
      hotelId: input.hotelId as string,
      resource,
      value: Math.round((input.value as number) * 100) / 100,
      unit: resourceUnits[resource],
      deviceId,
      recordedAt,
    },
  }
}