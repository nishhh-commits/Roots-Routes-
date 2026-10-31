import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  type DocumentData,
} from 'firebase/firestore'
import { getDb } from '../services/firebase'
import type { Reading } from '../types/reading'
import type { ReadingStore } from './store'

function toReading(data: DocumentData): Reading {
  return {
    id: data.id,
    hotelId: data.hotelId,
    resource: data.resource,
    value: data.value,
    unit: data.unit,
    deviceId: data.deviceId ?? null,
    recordedAt: data.recordedAt,
    source: data.source,
  }
}

function readingsQuery(hotelId: string) {
  return query(collection(getDb(), 'hotels', hotelId, 'readings'), orderBy('recordedAt'))
}

export function createFirestoreStore(): ReadingStore {
  return {
    async save(reading) {
      const db = getDb()
      const ref = doc(db, 'hotels', reading.hotelId, 'readings', reading.id)
      return runTransaction(db, async (transaction) => {
        const existing = await transaction.get(ref)
        if (existing.exists()) {
          return 'duplicate' as const
        }
        transaction.set(ref, { ...reading, receivedAt: serverTimestamp() })
        return 'saved' as const
      })
    },
    async list(hotelId) {
      const snapshot = await getDocs(readingsQuery(hotelId))
      return snapshot.docs.map((item) => toReading(item.data()))
    },
    subscribe(hotelId, onChange, onError) {
      return onSnapshot(
        readingsQuery(hotelId),
        (snapshot) => onChange(snapshot.docs.map((item) => toReading(item.data()))),
        (error) => onError(error.message),
      )
    },
  }
}