import { useState } from 'react'
import { Link } from 'react-router-dom'

import OptionChips from '../shared/OptionChips'
import { destinations } from '../../data/destinations'
import type { Interest } from '../../types/destination'
import type {
  CrowdPreference,
  Pace,
  Preferences,
  Transport,
} from '../../types/planner'

import {
  buildDay,
  generateItinerary,
  summarize,
} from '../../utils/itinerary'

import { saveTrip } from '../../services/trips'

const interestOptions: Interest[] = [
  'Heritage',
  'Culture',
  'Food',
  'Nature',
  'Shopping',
  'Photography',
  'Relaxation',
]

const cityDestinations = destinations.filter(
  (destination) => destination.cityId === destinations[0].cityId,
)

const initialPreferences: Preferences = {
  cityId: destinations[0].cityId,
  startId: destinations[0].id,
  days: 1,
  hoursPerDay: 8,
  budget: 3000,
  interests: ['Heritage', 'Culture'],
  crowd: 'Balanced',
  pace: 'Balanced',
  transport: 'Two-wheeler',
}

const selectClass =
  'mt-2 w-full rounded-md border border-sand-300 bg-white px-4 py-3 text-sm text-ink-800 outline-none focus:border-plum-700'

export default function TripPlanner() {
  const [prefs, setPrefs] = useState<Preferences>(initialPreferences)
  const [days, setDays] = useState<ReturnType<typeof generateItinerary>>([])
  const [error, setError] = useState('')
  const [savedSignature, setSavedSignature] = useState('')

  const signature =
    JSON.stringify(prefs) +
    '::' +
    days
      .map((day) =>
        day.map((stop) => stop.destination.id).join(','),
      )
      .join('|')

  const saved =
    savedSignature !== '' && savedSignature === signature

  function toggleInterest(interest: Interest) {
    setPrefs((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest],
    }))
  }

  function handleGenerate() {
    setError('')

    const result = generateItinerary(prefs)

    if (result.length === 0 || result.every((day) => day.length === 0)) {
      setDays([])
      setError(
        'No destinations match these preferences. Try changing your budget, transport or interests.',
      )
      return
    }

    setDays(result)
    setSavedSignature('')
  }

  function removeStop(destinationId: string) {
    setDays((currentDays) =>
      currentDays
        .map((day) =>
          day.filter(
            (stop) => stop.destination.id !== destinationId,
          ),
        )
        .filter((day) => day.length > 0),
    )
    setSavedSignature('')
  }

  function moveStop(
    dayIndex: number,
    index: number,
    direction: -1 | 1,
  ) {
    const target = index + direction

    setDays((currentDays) =>
      currentDays.map((day, i) => {
        if (
          i !== dayIndex ||
          target < 0 ||
          target >= day.length
        ) {
          return day
        }

        const list = day.map((stop) => stop.destination)
        const moved = list[index]

        list[index] = list[target]
        list[target] = moved

        return buildDay(prefs, list)
      }),
    )

    setSavedSignature('')
  }

  function handleSave() {
    if (days.length === 0) return

    saveTrip({
      id: `t${Date.now()}`,
      name: `${prefs.days} day${prefs.days > 1 ? 's' : ''} in Udaipur`,
      savedOn: new Date().toISOString().slice(0, 10),
      prefs,
      days: days.map((day) =>
        day.map((stop) => stop.destination.id),
      ),
    })

    setSavedSignature(signature)
  }

  const summary = summarize(prefs, days)

  return (
    <main className="min-h-screen bg-cream-50 px-5 py-10 text-ink-800 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/dashboard"
          className="text-sm text-plum-700 hover:underline"
        >
          ← Back to dashboard
        </Link>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
            Roots & Routes · Udaipur
          </p>

          <h1 className="mt-2 text-4xl font-semibold text-plum-900">
            Plan your journey
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-500">
            Tell us what you enjoy, your budget and your travel
            preferences. We will create a suggested Udaipur
            itinerary for you.
          </p>
        </div>

        <section className="mt-10 space-y-8 rounded-xl border border-sand-300 bg-white p-6 md:p-8">
          <div>
            <h2 className="text-xl font-semibold text-plum-900">
              01. What interests you?
            </h2>

            <p className="mb-4 mt-1 text-sm text-ink-500">
              Select one or more interests.
            </p>

            <OptionChips
              options={interestOptions}
              selected={prefs.interests}
              onToggle={toggleInterest}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="text-sm font-medium text-ink-700">
              Starting location
              <select
                className={selectClass}
                value={prefs.startId}
                onChange={(event) =>
                  setPrefs((current) => ({
                    ...current,
                    startId: event.target.value,
                  }))
                }
              >
                {cityDestinations.map((destination) => (
                  <option key={destination.id} value={destination.id}>
                    {destination.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-ink-700">
              Duration
              <select
                className={selectClass}
                value={prefs.days}
                onChange={(event) =>
                  setPrefs((current) => ({
                    ...current,
                    days: Number(event.target.value),
                  }))
                }
              >
                <option value={1}>1 day</option>
                <option value={2}>2 days</option>
                <option value={3}>3 days</option>
              </select>
            </label>

            <label className="text-sm font-medium text-ink-700">
              Daily available time
              <select
                className={selectClass}
                value={prefs.hoursPerDay}
                onChange={(event) =>
                  setPrefs((current) => ({
                    ...current,
                    hoursPerDay: Number(event.target.value),
                  }))
                }
              >
                <option value={4}>4 hours</option>
                <option value={6}>6 hours</option>
                <option value={8}>8 hours</option>
                <option value={10}>10 hours</option>
              </select>
            </label>

            <label className="text-sm font-medium text-ink-700">
              Total budget
              <select
                className={selectClass}
                value={prefs.budget}
                onChange={(event) =>
                  setPrefs((current) => ({
                    ...current,
                    budget: Number(event.target.value),
                  }))
                }
              >
                <option value={1500}>₹1,500</option>
                <option value={3000}>₹3,000</option>
                <option value={5000}>₹5,000</option>
                <option value={10000}>₹10,000</option>
              </select>
            </label>

            <label className="text-sm font-medium text-ink-700">
              Travel pace
              <select
                className={selectClass}
                value={prefs.pace}
                onChange={(event) =>
                  setPrefs((current) => ({
                    ...current,
                    pace: event.target.value as Pace,
                  }))
                }
              >
                <option>Relaxed</option>
                <option>Balanced</option>
                <option>Fast-paced</option>
              </select>
            </label>

            <label className="text-sm font-medium text-ink-700">
              Crowd preference
              <select
                className={selectClass}
                value={prefs.crowd}
                onChange={(event) =>
                  setPrefs((current) => ({
                    ...current,
                    crowd: event.target.value as CrowdPreference,
                  }))
                }
              >
                <option>Avoid crowded</option>
                <option>Balanced</option>
                <option>Crowds are okay</option>
              </select>
            </label>

            <label className="text-sm font-medium text-ink-700">
              Transport
              <select
                className={selectClass}
                value={prefs.transport}
                onChange={(event) =>
                  setPrefs((current) => ({
                    ...current,
                    transport: event.target.value as Transport,
                  }))
                }
              >
                <option>Walking</option>
                <option>Public transport</option>
                <option>Two-wheeler</option>
                <option>Car</option>
              </select>
            </label>
          </div>

          <button
            onClick={handleGenerate}
            className="rounded-full bg-plum-700 px-7 py-3 text-sm font-medium text-white transition hover:bg-plum-900"
          >
            Generate my itinerary →
          </button>

          {error && (
            <p className="text-sm text-red-700">{error}</p>
          )}
        </section>

        {days.length > 0 && (
          <section className="mt-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
                Your personalised plan
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-plum-900">
                Your Udaipur journey
              </h2>

              <p className="mt-2 text-sm text-ink-500">
                These are suggested destinations and estimated
                travel details, not live booking or traffic data.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-white p-4">
                <p className="text-xs text-ink-500">Places</p>
                <p className="mt-1 text-2xl font-semibold text-plum-900">
                  {summary.stops}
                </p>
              </div>

              <div className="rounded-lg bg-white p-4">
                <p className="text-xs text-ink-500">Estimated cost</p>
                <p className="mt-1 text-2xl font-semibold text-plum-900">
                  ₹{summary.cost}
                </p>
              </div>

              <div className="rounded-lg bg-white p-4">
                <p className="text-xs text-ink-500">Total time</p>
                <p className="mt-1 text-2xl font-semibold text-plum-900">
                  {Math.floor(summary.minutes / 60)}h {summary.minutes % 60}m
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {days.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="rounded-xl border border-sand-300 bg-white p-5 md:p-7"
                >
                  <h3 className="text-xl font-semibold text-plum-900">
                    Day {dayIndex + 1}
                  </h3>

                  <div className="mt-5 space-y-5">
                    {day.map((stop, index) => (
                      <article
                        key={stop.destination.id}
                        className="border-t border-sand-200 pt-5 first:border-0 first:pt-0"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-leaf-700">
                              Stop {index + 1} · {stop.destination.area}
                            </p>

                            <h4 className="mt-1 text-lg font-semibold text-plum-900">
                              {stop.destination.name}
                            </h4>

                            <p className="mt-2 text-sm text-ink-600">
                              {stop.reason}
                            </p>

                            <p className="mt-2 text-xs text-ink-500">
                              Visit: {stop.visitMinutes} min
                              {' · '}
                              Travel: {stop.travelKm} km
                              {' · '}
                              Approx. travel time: {stop.travelMinutes} min
                              {' · '}
                              Travel cost: ₹{stop.travelCost}
                            </p>

                            <p className="mt-1 text-xs text-ink-500">
                              Entry cost: ₹{stop.destination.entryCost}
                            </p>
                          </div>

                          <div className="flex shrink-0 gap-3 text-sm text-ink-500">
                            <button
                              onClick={() =>
                                moveStop(dayIndex, index, -1)
                              }
                              disabled={index === 0}
                              aria-label="Move up"
                              className="hover:text-ink-900 disabled:opacity-30"
                            >
                              Up
                            </button>

                            <button
                              onClick={() =>
                                moveStop(dayIndex, index, 1)
                              }
                              disabled={index === day.length - 1}
                              aria-label="Move down"
                              className="hover:text-ink-900 disabled:opacity-30"
                            >
                              Down
                            </button>

                            <button
                              onClick={() =>
                                removeStop(stop.destination.id)
                              }
                              className="hover:text-ink-900"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saved || days.length === 0}
                className="rounded-md bg-leaf-700 px-5 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-leaf-500 disabled:opacity-60"
              >
                {saved ? 'Saved' : 'Save trip'}
              </button>

              {saved && (
                <Link
                  to="/dashboard"
                  className="text-sm text-plum-700 underline"
                >
                  View on dashboard
                </Link>
              )}

              <button
                onClick={handleGenerate}
                className="text-sm text-ink-500 underline hover:text-plum-900"
              >
                Generate another itinerary
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}