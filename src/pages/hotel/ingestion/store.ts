import type { Reading } from '../types/reading'

export type ReadingStore = {
  save: (reading: Reading) => Promise<'saved' | 'duplicate'>
  list: (hotelId: string) => Promise<Reading[]>
  subscribe: (
    hotelId: string,
    onChange: (readings: Reading[]) => void,
    onError: (message: string) => void,
  ) => () => void
}

type Backend = {
  read: () => Reading[]
  write: (items: Reading[]) => void
}

type Listener = {
  hotelId: string
  onChange: (readings: Reading[]) => void
  onError: (message: string) => void
}

export function createBackedStore(backend: Backend): ReadingStore {
  const listeners = new Set<Listener>()

  function forHotel(hotelId: string) {
    return backend
      .read()
      .filter((item) => item.hotelId === hotelId)
      .sort((a, b) => a.recordedAt.localeCompare(b.recordedAt))
  }

  function notify() {
    listeners.forEach((listener) => {
      try {
        listener.onChange(forHotel(listener.hotelId))
      } catch (error) {
        listener.onError(error instanceof Error ? error.message : 'Could not read readings.')
      }
    })
  }

  return {
    async save(reading) {
      const items = backend.read()
      if (items.some((item) => item.id === reading.id)) {
        return 'duplicate'
      }
      backend.write([...items, reading])
      notify()
      return 'saved'
    },
    async list(hotelId) {
      return forHotel(hotelId)
    },
    subscribe(hotelId, onChange, onError) {
      const listener: Listener = { hotelId, onChange, onError }
      listeners.add(listener)
      try {
        onChange(forHotel(hotelId))
      } catch (error) {
        onError(error instanceof Error ? error.message : 'Could not read readings.')
      }
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

export function createMemoryStore(initial: Reading[] = []): ReadingStore {
  let items = [...initial]
  return createBackedStore({
    read: () => items,
    write: (next) => {
      items = next
    },
  })
}

const KEY = 'rr-readings-v1'

export function createLocalStore(): ReadingStore {
  return createBackedStore({
    read() {
      try {
        const raw = localStorage.getItem(KEY)
        const parsed: unknown = raw ? JSON.parse(raw) : []
        return Array.isArray(parsed) ? (parsed as Reading[]) : []
      } catch {
        return []
      }
    },
    write(items) {
      try {
        localStorage.setItem(KEY, JSON.stringify(items))
      } catch {
        throw new Error('Browser storage is unavailable or full.')
      }
    },
  })
}