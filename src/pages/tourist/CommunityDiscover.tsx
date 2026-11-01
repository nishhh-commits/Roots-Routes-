import { useEffect, useState } from 'react'
import { communityPlaces } from '../../data/community'
import type { CommunityPlace, PlaceStatus } from '../../types/community'
import PlaceCard from '../../components/community/PlaceCard'
import SubmitPlaceForm, { type NewPlace } from '../../components/community/SubmitPlaceForm'
import ModerationList from '../../components/community/ModerationList'
import CommunityFlow from '../../components/community/CommunityFlow'

const STORAGE_KEY = 'rr-community-places'

type Tab = 'Explore' | 'Submit' | 'Moderate'

const statusLabel: Record<PlaceStatus, string> = {
  pending: 'Pending Verification',
  approved: 'Approved',
  rejected: 'Rejected',
}

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
  const [moderator, setModerator] = useState(false)

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

  function toggleModerator() {
    if (moderator && tab === 'Moderate') {
      setTab('Explore')
    }
    setModerator(!moderator)
  }

  const approved = places.filter((place) => place.status === 'approved')
  const pendingCount = places.filter((place) => place.status === 'pending').length
  const mine = places.filter((place) => place.submittedBy === 'You')
  const tabs: Tab[] = moderator ? ['Explore', 'Submit', 'Moderate'] : ['Explore', 'Submit']

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-leaf-700">Community Discover</p>
      <h1 className="mt-2 text-4xl font-semibold text-plum-900">Hidden places, verified by locals</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Only places approved by a moderator appear on Explore. Starter entries are prototype data.
      </p>

      <CommunityFlow />
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              aria-pressed={tab === item}
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
        <button
          onClick={toggleModerator}
          aria-pressed={moderator}
          className="text-sm text-ink-500 underline hover:text-ink-900"
        >
          {moderator ? 'Exit moderator mode (demo)' : 'Moderator mode (demo)'}
        </button>
      </div>

      <div className="mt-8">
        {tab === 'Explore' &&
          (approved.length === 0 ? (
            <p className="border-t border-sand-300 py-6 text-ink-500">No approved places yet.</p>
          ) : (
            approved.map((place) => <PlaceCard key={place.id} place={place} />)
          ))}

        {tab === 'Submit' && (
          <div>
            <SubmitPlaceForm onSubmit={addPlace} />
            {mine.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-semibold text-plum-900">Your submissions</h2>
                <ul className="mt-3 max-w-xl">
                  {mine.map((place) => (
                    <li key={place.id} className="flex justify-between gap-4 border-t border-sand-300 py-3 text-sm">
                      <span className="text-ink-900">{place.name}</span>
                      <span className="text-ink-500">{statusLabel[place.status]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {tab === 'Moderate' && moderator && <ModerationList places={places} onDecide={decide} />}
      </div>

      {moderator && (
        <p className="mt-10 text-xs text-ink-500">
          Demo switch only. In the full product, only verified moderators would see the Moderate tab.
        </p>
      )}
    </div>
  )
}