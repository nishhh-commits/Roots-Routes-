import { useState } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from '../../data/destinations'
import { useAuth } from '../../services/auth'
import { deleteTrip, loadTrips, type SavedTrip } from '../../services/trips'

const actions = [
  { to: '/trip-planner', title: 'Plan a trip', text: 'Build an itinerary around your interests.' },
  { to: '/heritage-flow', title: 'Check crowds', text: 'See how busy places are before you go.' },
  { to: '/kala-connect', title: 'Meet artisans', text: 'Find workshops and local crafts.' },
  { to: '/community', title: 'Hidden places', text: 'Explore and submit community picks.' },
]

function stopNames(trip: SavedTrip) {
  return trip.days
    .flat()
    .map((id) => destinations.find((item) => item.id === id)?.name)
    .filter((name): name is string => Boolean(name))
}

export default function Dashboard() {
  const { user } = useAuth()
  const [trips, setTrips] = useState<SavedTrip[]>(loadTrips)
  const name = user ? user.email.split('@')[0] : 'traveller'

  function remove(id: string) {
    deleteTrip(id)
    setTrips(loadTrips())
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-sandstone-600">Tourist dashboard</p>
      <h1 className="mt-2 text-4xl font-semibold text-plum-900">Hello, {name}</h1>
      <p className="mt-3 text-ink-500">Where to next in Udaipur?</p>

      <div className="mt-8 grid sm:grid-cols-2 sm:gap-x-10">
        {actions.map((action) => (
          <Link key={action.to} to={action.to} className="group border-t border-sand-300 py-5">
            <h2 className="text-lg font-semibold text-plum-900 transition group-hover:text-plum-600">{action.title}</h2>
            <p className="mt-1 text-sm text-ink-500">{action.text}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-semibold text-plum-900">Saved trips</h2>
      <div className="mt-4">
        {trips.length === 0 ? (
          <div className="border-t border-sand-300 py-6">
            <p className="text-ink-500">No saved trips yet.</p>
            <Link to="/trip-planner" className="mt-3 inline-block text-sm text-plum-700 underline">
              Plan your first trip
            </Link>
          </div>
        ) : (
          trips.map((trip) => {
            const names = stopNames(trip)
            return (
              <article key={trip.id} className="flex items-start justify-between gap-4 border-t border-sand-300 py-5">
                <div>
                  <h3 className="text-lg font-semibold text-ink-900">{trip.name}</h3>
                  <p className="text-sm text-ink-500">
                    Saved {trip.savedOn} · {names.length} stops · {trip.prefs.budget} · {trip.prefs.pace}
                  </p>
                  <p className="mt-2 text-sm text-ink-700">{names.join(' → ')}</p>
                </div>
                <button onClick={() => remove(trip.id)} className="shrink-0 text-sm text-ink-500 hover:text-ink-900">
                  Delete
                </button>
              </article>
            )
          })
        )}
      </div>
    </div>
  )
}