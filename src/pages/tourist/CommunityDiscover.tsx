import { useEffect, useState } from 'react'

import { communityPlaces } from '../../data/community'

import type {
  CommunityPlace,
  PlaceStatus,
} from '../../types/community'

import PlaceCard from '../../components/community/PlaceCard'

import SubmitPlaceForm, {
  type NewPlace,
} from '../../components/community/SubmitPlaceForm'

import ModerationList from '../../components/community/ModerationList'

const STORAGE_KEY = 'rr-community-places'

type Tab = 'Explore' | 'Submit' | 'Moderate'

// Load saved places
function loadPlaces(): CommunityPlace[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    return raw
      ? (JSON.parse(raw) as CommunityPlace[])
      : communityPlaces

  } catch {
    return communityPlaces
  }
}

// Main Community Discover Component
export default function CommunityDiscover() {

  const [places, setPlaces] = useState<CommunityPlace[]>(loadPlaces)

  const [tab, setTab] = useState<Tab>('Explore')

  // Save places to local storage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(places)
      )
    } catch {
      console.error('Unable to save community places')
    }
  }, [places])

  // Add new place
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

    setTab('Explore')
  }

  // Approve or reject submitted places
  function decide(id: string, status: PlaceStatus) {

    setPlaces((current) =>
      current.map((place) =>
        place.id === id
          ? { ...place, status }
          : place
      )
    )
  }

  // Filter approved places
  const approved = places.filter(
    (place) => place.status === 'approved'
  )

  // Count pending submissions
  const pendingCount = places.filter(
    (place) => place.status === 'pending'
  ).length

  const tabs: Tab[] = [
    'Explore',
    'Submit',
    'Moderate',
  ]

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">

      {/* HEADER */}

      <p className="text-sm font-medium uppercase tracking-wide text-leaf-700">
        Community Discover
      </p>

      <h1 className="mt-2 text-4xl font-semibold text-plum-900">
        Hidden places, verified by locals
      </h1>

      <p className="mt-3 max-w-2xl text-ink-500">
        Only places approved by a moderator appear on Explore.
        Starter entries are prototype data.
      </p>

      {/* TABS */}

      <div className="mt-8 flex flex-wrap gap-2">

        {tabs.map((item) => (

          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={
              tab === item
                ? 'rounded-full bg-plum-700 px-4 py-1.5 text-sm text-cream-50'
                : 'rounded-full border border-sand-300 px-4 py-1.5 text-sm text-ink-700 hover:bg-cream-100'
            }
          >
            {item === 'Moderate'
              ? `Moderate (${pendingCount})`
              : item}
          </button>

        ))}

      </div>

      {/* TAB CONTENT */}

      <div className="mt-8">

        {/* EXPLORE */}

        {tab === 'Explore' && (

          approved.length === 0 ? (

            <p className="border-t border-sand-300 py-6 text-ink-500">
              No approved places yet.
            </p>

          ) : (

            approved.map((place) => (

              <PlaceCard
                key={place.id}
                place={place}
              />

            ))

          )

        )}

        {/* SUBMIT */}

        {tab === 'Submit' && (

          <SubmitPlaceForm
            onSubmit={addPlace}
          />

        )}

        {/* MODERATE */}

        {tab === 'Moderate' && (

          <ModerationList
            places={places}
            onDecide={decide}
          />

        )}

      </div>

    </div>
  )
}