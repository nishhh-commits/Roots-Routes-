import { firebaseConfigured } from '../services/firebase'
import { createFirestoreStore } from './firestoreStore'
import { createLocalStore, type ReadingStore } from './store'

let store: ReadingStore | null = null

export function getReadingStore(): ReadingStore {
  if (!store) {
    store = firebaseConfigured ? createFirestoreStore() : createLocalStore()
  }
  return store
}

export function storageMode(): 'browser' | 'firestore' {
  return firebaseConfigured ? 'firestore' : 'browser'
}