import type { Reading } from '../types/reading'
import type { ReadingStore } from './store'
import { validateReading } from './validate'

export type IngestionResult = {
  status: 'saved' | 'duplicate' | 'invalid' | 'error'
  errors?: string[]
  message?: string
}

export async function ingestReading(
  reading: Reading,
  store: ReadingStore,
): Promise<IngestionResult> {
  const validation = validateReading(reading)

  if (!validation.valid) {
    return {
      status: 'invalid',
      errors: validation.errors,
    }
  }

  try {
    const result = await store.save(reading)

    return {
      status: result,
    }
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Unable to save reading.',
    }
  }
}