import { useState } from 'react'
import { crowdReports } from '../../data/heritage'
import CrowdCard from '../../components/tourist/CrowdCard'

const filters = ['All', 'Low', 'Moderate', 'High']

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
      <div className="mt-8 flex flex-wrap gap-2">
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
      <div className="mt-8">
        {visible.length === 0 ? (
          <p className="border-t border-sand-300 py-6 text-ink-500">No places match this filter.</p>
        ) : (
          visible.map((report) => <CrowdCard key={report.destinationId} report={report} all={crowdReports} />)
        )}
      </div>
    </div>
  )
}