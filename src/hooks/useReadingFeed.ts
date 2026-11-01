import { useCallback, useEffect, useRef, useState } from 'react'
import { ingestReading } from '../ingestion/pipeline'
import { createSimulatedReading } from '../ingestion/simulator'
import { getReadingStore } from '../ingestion/storeFactory'
import type { IngestResult, Reading } from '../types/reading'

export const HOTEL_ID = 'demo-hotel'

const COOLDOWN_MS = 1200

export type FeedMessage = {
  kind: 'success' | 'error' | 'info'
  text: string
}

function describe(result: IngestResult): FeedMessage {
  switch (result.status) {
    case 'saved':
      return {
        kind: 'success',
        text: `Simulated reading saved: ${result.reading.resource} ${result.reading.value} ${result.reading.unit} from ${result.reading.deviceId}.`,
      }
    case 'duplicate':
      return { kind: 'info', text: 'That reading was already saved, so nothing was added.' }
    case 'invalid':
      return { kind: 'error', text: `Reading rejected: ${result.errors.join(' ')}` }
    case 'rejected':
      return { kind: 'error', text: result.errors.join(' ') }
    case 'failed':
      return { kind: 'error', text: `Could not save the reading: ${result.message} Nothing was recorded.` }
  }
}

export function useReadingFeed() {
  const [readings, setReadings] = useState<Reading[]>([])
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<FeedMessage | null>(null)
  const busy = useRef(false)
  const lastAt = useRef(0)
  const latest = useRef<Reading[]>([])

  useEffect(() => {
    return getReadingStore().subscribe(
      HOTEL_ID,
      (items) => {
        latest.current = items
        setReadings(items)
        setLoading(false)
      },
      (text) => {
        setMessage({ kind: 'error', text })
        setLoading(false)
      },
    )
  }, [])

  const simulate = useCallback(async () => {
    if (busy.current || Date.now() - lastAt.current < COOLDOWN_MS) {
      return
    }
    busy.current = true
    lastAt.current = Date.now()
    setPending(true)
    setMessage(null)
    const sequence = latest.current.filter((item) => item.source === 'simulated-device').length
    const raw = createSimulatedReading(sequence, HOTEL_ID, new Date())
    const result = await ingestReading(raw, 'simulated-device', { store: getReadingStore() })
    setMessage(describe(result))
    busy.current = false
    setPending(false)
  }, [])

  return { readings, loading, pending, message, simulate }
}