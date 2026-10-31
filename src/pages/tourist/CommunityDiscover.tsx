import { useEffect, useState } from 'react'
import { communityPlaces } from '../../data/community'
import type { CommunityPlace, PlaceStatus } from '../../types/community'
import PlaceCard from '../../components/community/PlaceCard'
import SubmitPlaceForm, { type NewPlace } from '../../components/community/SubmitPlaceForm'
import ModerationList from '../../components/community/ModerationList'

const STORAGE_KEY = 'rr-community-places'

type Tab = 'Explore' | 'Submit' | 'Moderate'

function loadPlaces(): CommunityPlace[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CommunityPlace[]) : communityPlaces
  } catch {
    return communityPlaces
  }
}

export default function CommunityDiscover() {
  const [places, setPlaces] = useState<CommunityPlace[]>(loadPlaces)
  const [tab, setTab] = useState<Tab>('Explore')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(places))
    } catch {
      return
    }
  }, [places])

  function addPlace(input: NewPlace) {
    const place: CommunityPlace = {
      ...input,
      id: `c${Date.now()}`,
      submittedBy: 'You',
      submittedOn: new Date().toISOString().slice(0, 10),
      status: 'pending',
      isDemo: false,
    }
    setPlaces((current) => [place, ...current])
  }

  function decide(id: string, status: PlaceStatus) {
    setPlaces((current) => current.map((place) => (place.id === id ? { ...place, status } : place)))
  }

  const approved = places.filter((place) => place.status === 'approved')
  const pendingCount = places.filter((place) => place.status === 'pending').length
  const tabs: Tab[] = ['Explore', 'Submit', 'Moderate']

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-leaf-700">Community Discover</p>
      <h1 className="mt-2 text-4xl font-semibold text-plum-900">Hidden places, verified by locals</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Only places approved by a moderator appear on Explore. Starter entries are prototype data.
      </p>
      <div className="mt-8 flex gap-2">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={
              tab === item
                ? 'rounded-full bg-plum-700 px-4 py-1.5 text-sm text-cream-50'
                : 'rounded-full border border-sand-300 px-4 py-1.5 text-sm text-ink-700 hover:bg-cream-100'
            }
          >
            {item === 'Moderate' ? `Moderate (${pendingCount})` : item}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {tab === 'Explore' &&
          (approved.length === 0 ? (
            <p className="border-t border-sand-300 py-6 text-ink-500">No approved places yet.</p>
          ) : (
            approved.map((place) => <PlaceCard key={place.id} place={place} />)
          ))}
        {tab === 'Submit' && <SubmitPlaceForm onSubmit={addPlace} />}
        {tab === 'Moderate' && <ModerationList places={places} onDecide={decide} />}
      </div>
    </div>
  )
}