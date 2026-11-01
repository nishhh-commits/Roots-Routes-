import { useState } from 'react'
import { crowdReports } from '../../data/heritage'
import CrowdCard from '../../components/tourist/CrowdCard'
import HeritageMap from '../../components/tourist/HeritageMap'
import { Link, useNavigate } from 'react-router-dom'
import { loadSession, requestOptimize } from '../../services/plannerSession'

const filters = ['All', 'Low', 'Moderate', 'High']
const views = ['List', 'Map']
  const [view, setView] = useState('List')
  const navigate = useNavigate()
  const session = loadSession()
  const inTrip = session ? session.days.flat() : []
  const busyInTrip = crowdReports.filter((report) => report.level === 'High' && inTrip.includes(report.destinationId))

  function optimize() {
    requestOptimize()
    navigate('/trip-planner')
  }
export default function HeritageFlow() {
  const [active, setActive] = useState('All')
  
  const visible = active === 'All' ? crowdReports : crowdReports.filter((report) => report.level === active)

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-sandstone-600">HeritageFlow</p>
      <h1 className="mt-2 text-4xl font-semibold text-plum-900">See how busy Udaipur is before you go</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Prototype data: these crowd reports are samples to show how the feature works. They are not live crowd detection.
      </p>

            <div className="mt-8 border-y border-sand-300 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-sandstone-600">Demo / simulated crowd data</p>
        {session ? (
          busyInTrip.length > 0 ? (
            <>
              <p className="mt-1 text-ink-900">
                Your itinerary includes {busyInTrip.map((report) => report.name).join(' and ')}, shown as High crowd here.
              </p>
              <button
                onClick={optimize}
                className="mt-3 rounded-md bg-plum-700 px-5 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-plum-900"
              >
                Optimize my itinerary
              </button>
              <p className="mt-2 text-xs text-ink-500">Swaps busy places for quieter alternatives using this data.</p>
            </>
          ) : (
            <p className="mt-1 text-ink-700">
              Your itinerary has no high-crowd places right now.{' '}
              <Link to="/trip-planner" className="text-plum-700 underline">View itinerary</Link>
            </p>
          )
        ) : (
          <p className="mt-1 text-ink-700">
            Generate a trip first, then come back to adapt it to crowd levels.{' '}
            <Link to="/trip-planner" className="text-plum-700 underline">Open Trip Planner</Link>
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={
                active === filter
                  ? 'rounded-full bg-plum-700 px-4 py-1.5 text-sm text-cream-50'
                  : 'rounded-full border border-sand-300 px-4 py-1.5 text-sm text-ink-700 hover:bg-cream-100'
              }
            >
              {filter === 'All' ? 'All places' : `${filter} crowd`}
            </button>
          ))}
        </div>
        <div className="flex gap-4 text-sm">
          {views.map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={view === item ? 'font-medium text-plum-700 underline' : 'text-ink-500 hover:text-ink-900'}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {visible.length === 0 ? (
          <p className="border-t border-sand-300 py-6 text-ink-500">No places match this filter.</p>
        ) : view === 'Map' ? (
          <HeritageMap reports={visible} />
        ) : (
                    visible.map((report) => (
            <CrowdCard
              key={report.destinationId}
              report={report}
              all={crowdReports}
              inTrip={inTrip.includes(report.destinationId)}
            />
          ))
        )}
      </div>
    </div>
  )
}