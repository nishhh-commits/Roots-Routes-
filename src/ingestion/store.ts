import type { Reading } from '../types/reading'

export type ReadingStore = {
  save(reading: Reading): Promise<'saved' | 'duplicate'>
  list(hotelId: string): Promise<Reading[]>
  subscribe(
    hotelId: string,
    onChange: (readings: Reading[]) => void,
    onError: (message: string) => void,
  ): () => void
}

const STORAGE_KEY = 'roots-routes-readings'

function readAll(): Reading[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)

    if (!Array.isArray(parsed)) return []

    return parsed as Reading[]
  } catch {
    return []
  }
}

function writeAll(readings: Reading[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(readings))
}

export function createLocalStore(): ReadingStore {
  return {
    async save(reading) {
      const readings = readAll()

      const duplicate = readings.some(
        (item) =>
          item.hotelId === reading.hotelId &&
          item.id === reading.id,
      )

      if (duplicate) return 'duplicate'

      writeAll([...readings, reading])

      return 'saved'
    },

    async list(hotelId) {
      return readAll()
        .filter((reading) => reading.hotelId === hotelId)
        .sort(
          (a, b) =>
            new Date(a.recordedAt).getTime() -
            new Date(b.recordedAt).getTime(),
        )
    },

    subscribe(hotelId, onChange, onError) {
      const notify = () => {
        try {
          const readings = readAll()
            .filter((reading) => reading.hotelId === hotelId)
            .sort(
              (a, b) =>
                new Date(a.recordedAt).getTime() -
                new Date(b.recordedAt).getTime(),
            )

          onChange(readings)
        } catch (error) {
          onError(
            error instanceof Error
              ? error.message
              : 'Unable to read local storage.',
          )
        }
      }

      notify()

      const handleStorage = (event: StorageEvent) => {
        if (event.key === STORAGE_KEY) notify()
      }

      window.addEventListener('storage', handleStorage)

      return () => {
        window.removeEventListener('storage', handleStorage)
      }
    },
  }
}