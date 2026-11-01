import { useCallback, useEffect, useRef, useState } from 'react'

import { ingestReading } from '../ingestion/pipeline'
import { createSimulatedReading } from '../ingestion/simulator'
import { getReadingStore } from '../ingestion/storeFactory'

import type { IngestionResult } from '../ingestion/pipeline'
import type { Reading, ReadingResource } from '../types/reading'

export const HOTEL_ID = 'demo-hotel'

const COOLDOWN_MS = 1200

const demoResources: ReadingResource[] = [
  'water',
  'energy',
  'waste',
]

export type FeedMessage = {
  kind: 'success' | 'error' | 'info'
  text: string
}

function describe(
  result: IngestionResult,
  reading: Reading,
): FeedMessage {
  switch (result.status) {
    case 'saved':
      return {
        kind: 'success',
        text: `Demo reading saved: ${reading.resource} ${reading.value} ${reading.unit}.`,
      }

    case 'duplicate':
      return {
        kind: 'info',
        text: 'This reading already exists. No duplicate was added.',
      }

    case 'invalid':
      return {
        kind: 'error',
        text: `Reading rejected: ${result.errors?.join(' ') ?? 'Invalid reading.'}`,
      }

    case 'error':
      return {
        kind: 'error',
        text: `Could not save the reading: ${result.message ?? 'Unknown error.'}`,
      }
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
      (errorText) => {
        setMessage({
          kind: 'error',
          text: errorText,
        })
        setLoading(false)
      },
    )
  }, [])

  const simulate = useCallback(async () => {
    if (
      busy.current ||
      Date.now() - lastAt.current < COOLDOWN_MS
    ) {
      return
    }

    busy.current = true
    lastAt.current = Date.now()
    setPending(true)
    setMessage(null)

    try {
      const demoReadings = latest.current.filter(
        (item) => item.source === 'demo',
      )

      const sequence = demoReadings.length
      const resource = demoResources[sequence % demoResources.length]

      const baseValues: Record<ReadingResource, number> = {
        water: 100,
        energy: 250,
        waste: 12,
      }

      const reading = createSimulatedReading(
        HOTEL_ID,
        resource,
        baseValues[resource] + sequence,
        new Date(),
      )

      const result = await ingestReading(
        reading,
        getReadingStore(),
      )

      setMessage(describe(result, reading))
    } catch (error) {
      setMessage({
        kind: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'Unable to generate the demo reading.',
      })
    } finally {
      busy.current = false
      setPending(false)
    }
  }, [])

  return {
    readings,
    loading,
    pending,
    message,
    simulate,
  }
}