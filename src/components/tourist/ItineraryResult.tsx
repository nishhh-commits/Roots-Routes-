import { useState } from 'react'
import type { Destination } from '../../types/destination'
import type { PlannedStop, Preferences } from '../../types/planner'

type Changes = {
removed: Destination[]
added: Destination[]
} | null

type ItineraryResultProps = {
prefs: Preferences
days: PlannedStop[][]
changes: Changes
saved: boolean
onRemove: (id: string) => void
onMove: (dayIndex: number, index: number, direction: -1 | 1) => void
onSave: () => void
onOptimize: () => void
onRegenerate: () => void
onEdit: () => void
}

export default function ItineraryResult({
prefs,
days,
changes,
saved,
onRemove,
onMove,
onSave,
onOptimize,
onRegenerate,
onEdit,
}: ItineraryResultProps) {
const [expandedReasons, setExpandedReasons] = useState<string[]>([])

const totalStops = days.reduce((total, day) => total + day.length, 0)

const totalCost = days.reduce(
(total, day) =>
total +
day.reduce(
(dayTotal, stop) =>
dayTotal + stop.destination.entryCost + stop.travelCost,
0,
),
0,
)

const totalVisitMinutes = days.reduce(
(total, day) =>
total +
day.reduce((dayTotal, stop) => dayTotal + stop.visitMinutes, 0),
0,
)

function toggleReasons(id: string) {
setExpandedReasons((current) =>
current.includes(id)
? current.filter((item) => item !== id)
: [...current, id],
)
}

return (
<main className="mx-auto min-h-screen max-w-6xl px-5 py-10 text-plum-900 sm:px-8">
<div className="mb-8">
<button
onClick={onEdit}
className="mb-5 text-sm font-semibold text-plum-700 hover:text-plum-950"
>
← Edit preferences
</button>

    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
      Your personalized journey
    </p>

    <h1 className="font-display text-3xl font-bold sm:text-4xl">
      Your trip is ready
    </h1>

    <p className="mt-3 max-w-2xl text-sm leading-6 text-plum-700">
      Explore your selected destinations, discover local experiences,
      and adjust your journey whenever you want.
    </p>
  </div>

  {/* Trip summary */}
  <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
    <SummaryCard label="Trip duration" value={`${prefs.days} days`} />
    <SummaryCard label="Destinations" value={String(totalStops)} />
    <SummaryCard
      label="Estimated cost"
      value={`₹${totalCost.toLocaleString('en-IN')}`}
    />
    <SummaryCard
      label="Visit time"
      value={`${Math.floor(totalVisitMinutes / 60)}h ${totalVisitMinutes % 60}m`}
    />
  </section>

  {/* Action buttons */}
  <section className="mb-8 flex flex-wrap gap-3">
    <button
      onClick={onSave}
      disabled={saved}
      className="rounded-xl bg-plum-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-plum-800 disabled:cursor-not-allowed disabled:bg-teal-700"
    >
      {saved ? '✓ Trip saved' : 'Save this trip'}
    </button>

    <button
      onClick={onOptimize}
      className="rounded-xl border border-teal-700 px-5 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
    >
      Optimize for crowds
    </button>

    <button
      onClick={onRegenerate}
      className="rounded-xl border border-plum-200 px-5 py-3 text-sm font-semibold text-plum-800 transition hover:bg-plum-50"
    >
      Regenerate itinerary
    </button>
  </section>

  {/* Optimization changes */}
  {changes && (
    <section className="mb-8 rounded-2xl border border-teal-200 bg-teal-50 p-5">
      <h2 className="font-semibold text-teal-900">
        Itinerary updated
      </h2>

      {changes.removed.length > 0 && (
        <p className="mt-2 text-sm text-teal-800">
          Removed: {changes.removed.map((item) => item.name).join(', ')}
        </p>
      )}

      {changes.added.length > 0 && (
        <p className="mt-2 text-sm text-teal-800">
          Added: {changes.added.map((item) => item.name).join(', ')}
        </p>
      )}

      {changes.removed.length === 0 && changes.added.length === 0 && (
        <p className="mt-2 text-sm text-teal-800">
          Your itinerary did not need any changes.
        </p>
      )}
    </section>
  )}

  {/* Daily itinerary */}
  {days.length === 0 ? (
    <div className="rounded-2xl border border-plum-100 bg-white p-8 text-center">
      <h2 className="text-xl font-semibold">No destinations found</h2>
      <p className="mt-2 text-sm text-plum-600">
        Try changing your preferences or generating another itinerary.
      </p>
      <button
        onClick={onEdit}
        className="mt-5 rounded-xl bg-plum-900 px-5 py-3 text-sm font-semibold text-white"
      >
        Change preferences
      </button>
    </div>
  ) : (
    <div className="space-y-8">
      {days.map((day, dayIndex) => (
        <section
          key={`day-${dayIndex}`}
          className="overflow-hidden rounded-3xl border border-plum-100 bg-white"
        >
          <div className="border-b border-plum-100 bg-[#F8F3E9] px-5 py-5 sm:px-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
              Your journey
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold">
              Day {dayIndex + 1}
            </h2>
            <p className="mt-1 text-sm text-plum-600">
              {day.length} destinations planned
            </p>
          </div>

          <div className="divide-y divide-plum-100">
            {day.map((stop, index) => {
              const id = stop.destination.id
              const expanded = expandedReasons.includes(id)

              return (
                <article key={`${id}-${index}`} className="p-5 sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-plum-100 font-bold text-plum-900">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold">
                          {stop.destination.name}
                        </h3>
                        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
                          {String(stop.level)} crowd
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-plum-600">
                        {stop.destination.area}
                      </p>

                      <p className="mt-3 text-sm leading-6 text-plum-700">
                        {stop.reason}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <Detail label="Start time" value={stop.startTime} />
                        <Detail
                          label="Visit duration"
                          value={`${stop.visitMinutes} min`}
                        />
                        <Detail
                          label="Entry cost"
                          value={`₹${stop.destination.entryCost}`}
                        />
                        <Detail
                          label="Travel cost"
                          value={`₹${stop.travelCost}`}
                        />
                      </div>

                      <p className="mt-3 text-xs text-plum-500">
                        Travel: {stop.travelKm.toFixed(1)} km ·{' '}
                        {stop.travelMinutes} min
                      </p>

                      <button
                        onClick={() => toggleReasons(id)}
                        className="mt-4 text-sm font-semibold text-teal-800 hover:text-teal-950"
                      >
                        {expanded ? 'Hide explanation ↑' : 'Why this place? ↓'}
                      </button>

                      {expanded && (
                        <div className="mt-3 rounded-xl bg-[#F8F3E9] p-4">
                          {stop.reasons.length > 0 ? (
                            <ul className="space-y-2">
                              {stop.reasons.map((reason, reasonIndex) => (
                                <li
                                  key={`${reason.kind}-${reasonIndex}`}
                                  className="text-sm text-plum-700"
                                >
                                  <span className="font-semibold capitalize">
                                    {reason.kind}:
                                  </span>{' '}
                                  {reason.text}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-plum-700">
                              {stop.reason}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="mt-5 flex flex-wrap gap-2">
                        <button
                          onClick={() => onMove(dayIndex, index, -1)}
                          disabled={index === 0}
                          className="rounded-lg border border-plum-200 px-3 py-2 text-xs font-semibold text-plum-800 disabled:opacity-30"
                        >
                          ↑ Move up
                        </button>

                        <button
                          onClick={() => onMove(dayIndex, index, 1)}
                          disabled={index === day.length - 1}
                          className="rounded-lg border border-plum-200 px-3 py-2 text-xs font-semibold text-plum-800 disabled:opacity-30"
                        >
                          ↓ Move down
                        </button>

                        <button
                          onClick={() => onRemove(id)}
                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                        >
                          Remove stop
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )}

  <p className="mt-8 text-center text-xs leading-5 text-plum-500">
    Costs, travel times and crowd levels are estimates. Actual conditions
    may vary during your visit.
  </p>
</main>

)
}

function SummaryCard({ label, value }: { label: string; value: string }) {
return (
<div className="rounded-2xl border border-plum-100 bg-white p-4">
<p className="text-xs text-plum-500">{label}</p>
<p className="mt-2 text-lg font-bold text-plum-900">{value}</p>
</div>
)
}

function Detail({ label, value }: { label: string; value: string }) {
return (
<div className="rounded-xl bg-[#F8F3E9] p-3">
<p className="text-xs text-plum-500">{label}</p>
<p className="mt-1 text-sm font-semibold text-plum-900">{value}</p>
</div>
)
}