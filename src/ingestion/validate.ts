import type { Reading } from '../types/reading'

export type ValidationResult = {
  valid: boolean
  errors: string[]
}

export function validateReading(input: unknown): ValidationResult {
  const errors: string[] = []

  if (!input || typeof input !== 'object') {
    return {
      valid: false,
      errors: ['Reading must be an object.'],
    }
  }

  const reading = input as Partial<Reading>

  if (!reading.id || typeof reading.id !== 'string') {
    errors.push('Reading ID is required.')
  }

  if (!reading.hotelId || typeof reading.hotelId !== 'string') {
    errors.push('Hotel ID is required.')
  }

  if (!['water', 'energy', 'waste'].includes(reading.resource ?? '')) {
    errors.push('Invalid resource type.')
  }

  if (
    typeof reading.value !== 'number' ||
    !Number.isFinite(reading.value) ||
    reading.value < 0
  ) {
    errors.push('Reading value must be a non-negative finite number.')
  }

  if (!reading.unit || typeof reading.unit !== 'string') {
    errors.push('Reading unit is required.')
  }

  if (
    reading.deviceId !== null &&
    typeof reading.deviceId !== 'string'
  ) {
    errors.push('Device ID must be a string or null.')
  }

  if (
    !reading.recordedAt ||
    typeof reading.recordedAt !== 'string' ||
    Number.isNaN(Date.parse(reading.recordedAt))
  ) {
    errors.push('A valid recorded date is required.')
  }

  if (!['manual', 'device', 'demo'].includes(reading.source ?? '')) {
    errors.push('Invalid reading source.')
  }

  if (reading.source === 'manual' && reading.deviceId !== null) {
    errors.push('Manual readings cannot have a device ID.')
  }

  if (reading.source === 'device' && !reading.deviceId) {
    errors.push('Device readings require a device ID.')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}