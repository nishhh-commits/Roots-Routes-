import { ingestReading } from '../src/ingestion/pipeline'
import { createSimulatedReading } from '../src/ingestion/simulator'
import type { ReadingStore } from '../src/ingestion/store'
import { summariseFeed } from '../src/ingestion/stats'
import { validateReading } from '../src/ingestion/validate'
import type { Reading } from '../src/types/reading'

let passed = 0
let failed = 0

function check(name: string, condition: boolean): void {
  if (condition) {
    passed += 1
    console.log(`PASS  ${name}`)
  } else {
    failed += 1
    console.error(`FAIL  ${name}`)
  }
}

const HOTEL = 'demo-hotel'
const now = new Date('2026-10-30T10:00:00.000Z')

function createMemoryStore(): ReadingStore {
  const readings: Reading[] = []
  const listeners = new Set<(items: Reading[]) => void>()

  return {
    async save(reading) {
      const duplicate = readings.some(
        (item) =>
          item.hotelId === reading.hotelId &&
          item.id === reading.id,
      )

      if (duplicate) {
        return 'duplicate'
      }

      readings.push(reading)

      listeners.forEach((listener) => {
        listener([...readings])
      })

      return 'saved'
    },

    async list(hotelId) {
      return readings.filter(
        (reading) => reading.hotelId === hotelId,
      )
    },

    subscribe(hotelId, onChange, onError) {
      const listener = (items: Reading[]) => {
        try {
          onChange(
            items.filter((reading) => reading.hotelId === hotelId),
          )
        } catch (error) {
          onError(
            error instanceof Error
              ? error.message
              : 'Subscription failed.',
          )
        }
      }

      listeners.add(listener)
      listener([...readings])

      return () => {
        listeners.delete(listener)
      }
    },
  }
}

const failingStore: ReadingStore = {
  save: async () => {
    throw new Error('Permission denied.')
  },

  list: async () => [],

  subscribe: () => () => undefined,
}

async function main(): Promise<void> {
  console.log('\nStarting ingestion tests...\n')

  // 1. Simulator tests

  const good = createSimulatedReading(
    HOTEL,
    'water',
    12.4,
    now,
  )

  check(
    'simulator creates a reading',
    good.hotelId === HOTEL,
  )

  check(
    'simulator creates deterministic readings',
    JSON.stringify(
      createSimulatedReading(HOTEL, 'water', 12.4, now),
    ) ===
      JSON.stringify(
        createSimulatedReading(HOTEL, 'water', 12.4, now),
      ),
  )

  check(
    'simulated reading has demo source',
    good.source === 'demo',
  )

  check(
    'simulated reading has a device ID',
    typeof good.deviceId === 'string',
  )

  check(
    'simulated reading passes validation',
    validateReading(good).valid,
  )

  // 2. Validation tests

  const bad = (patch: Record<string, unknown>): boolean => {
    return validateReading({
      ...good,
      ...patch,
    }).valid
  }

  check('rejects negative value', !bad({ value: -3 }))

  check('rejects string value', !bad({ value: '12' }))

  check('rejects NaN', !bad({ value: Number.NaN }))

  check(
    'rejects Infinity',
    !bad({ value: Number.POSITIVE_INFINITY }),
  )

  check(
    'rejects missing hotel ID',
    !bad({ hotelId: undefined }),
  )

  check(
    'rejects invalid resource',
    !bad({ resource: 'gas' }),
  )

  check(
    'rejects invalid timestamp',
    !bad({ recordedAt: 'yesterday-ish' }),
  )

  check(
    'rejects invalid source',
    !bad({ source: 'connected-device' }),
  )

  check(
    'rejects null payload',
    !validateReading(null).valid,
  )

  check(
    'rejects string payload',
    !validateReading('hello').valid,
  )

  // 3. Manual reading tests

  const manual: Reading = {
    id: 'MANUAL-001',
    hotelId: HOTEL,
    resource: 'water',
    value: 20,
    unit: 'kL',
    deviceId: null,
    recordedAt: now.toISOString(),
    source: 'manual',
  }

  check(
    'manual reading passes validation',
    validateReading(manual).valid,
  )

  check(
    'manual reading rejects device ID',
    !validateReading({
      ...manual,
      deviceId: 'DEVICE-001',
    }).valid,
  )

  // 4. Store tests

  const store = createMemoryStore()
  let notifications = 0

  const unsubscribe = store.subscribe(
    HOTEL,
    () => {
      notifications += 1
    },
    () => undefined,
  )

  const first = await ingestReading(good, store)

  check(
    'valid reading is saved',
    first.status === 'saved',
  )

  check(
    'subscriber is notified after saving',
    notifications === 2,
  )

  check(
    'saved reading appears in list',
    (await store.list(HOTEL)).length === 1,
  )

  // 5. Duplicate tests

  const duplicate = await ingestReading(good, store)

  check(
    'duplicate reading is detected',
    duplicate.status === 'duplicate',
  )

  check(
    'duplicate is not stored twice',
    (await store.list(HOTEL)).length === 1,
  )

  // 6. Race condition tests

  const raceStore = createMemoryStore()

  const race = await Promise.all([
    ingestReading(good, raceStore),
    ingestReading(good, raceStore),
  ])

  const savedCount = race.filter(
    (result) => result.status === 'saved',
  ).length

  check(
    'simultaneous submissions save only once',
    savedCount === 1 &&
      (await raceStore.list(HOTEL)).length === 1,
  )

  // 7. Invalid ingestion tests

  const invalidReading: Reading = {
    ...good,
    id: 'INVALID-001',
    value: -1,
  }

  const invalid = await ingestReading(
    invalidReading,
    store,
  )

  check(
    'invalid reading returns invalid status',
    invalid.status === 'invalid',
  )

  check(
    'invalid reading contains validation errors',
    invalid.status === 'invalid' &&
      (invalid.errors?.length ?? 0) > 0,
  )

  check(
    'invalid reading is not stored',
    (await store.list(HOTEL)).length === 1,
  )

  // 8. Store failure tests

  const failure = await ingestReading(
    good,
    failingStore,
  )

  check(
    'store failure returns error status',
    failure.status === 'error',
  )

  check(
    'store failure contains error message',
    failure.status === 'error' &&
      failure.message === 'Permission denied.',
  )

  // 9. Feed summary tests

  const feedStore = createMemoryStore()

  const waterReadings: Reading[] = [
    {
      ...good,
      id: 'WATER-001',
      value: 12.4,
    },
    {
      ...good,
      id: 'WATER-002',
      value: 13.1,
    },
  ]

  const energyReading: Reading = {
    ...good,
    id: 'ENERGY-001',
    resource: 'energy',
    value: 50,
    unit: 'kWh',
  }

  for (const reading of [
    ...waterReadings,
    energyReading,
  ]) {
    await feedStore.save(reading)
  }

  const readings = await feedStore.list(HOTEL)
  const summary = summariseFeed(readings)

  const water = summary.perResource.find(
    (item) => item.resource === 'water',
  )

  const energy = summary.perResource.find(
    (item) => item.resource === 'energy',
  )

  check(
    'summary counts all readings',
    summary.totalReadings === 3,
  )

  check(
    'summary finds water readings',
    water?.count === 2,
  )

  check(
    'summary calculates water total',
    water?.total === 25.5,
  )

  check(
    'summary calculates water average',
    water?.average === 12.75,
  )

  check(
    'summary finds energy readings',
    energy?.count === 1,
  )

  check(
    'empty feed has zero readings',
    summariseFeed([]).totalReadings === 0,
  )

  // 10. Cleanup

  unsubscribe()

  console.log('\n----------------------------')
  console.log(`Tests passed: ${passed}`)
  console.log(`Tests failed: ${failed}`)
  console.log('----------------------------')

  if (failed > 0) {
    throw new Error(`${failed} ingestion test(s) failed.`)
  }

  console.log('\nAll ingestion tests passed!')
}

main().catch((error: unknown) => {
  console.error('\nTest execution failed:', error)
  throw error
})