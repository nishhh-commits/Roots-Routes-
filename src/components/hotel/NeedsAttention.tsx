import { useState } from 'react'
import type { Attention } from '../../utils/insights'

export default function NeedsAttention({ items }: { items: Attention[] }) {
  const [planned, setPlanned] = useState<string[]>([])
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? items : items.slice(0, 4)

  function toggle(id: string) {
    setPlanned((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-semibold text-plum-900">Needs attention</h2>
        <p className="text-sm text-ink-500">
          {planned.length} of {items.length} actions planned
        </p>
      </div>
      <p className="mt-1 text-sm text-ink-500">
        Data → insight → action. Observations are calculated from the demo figures on this page.
      </p>
      <div className="mt-4 max-w-3xl">
        {visible.map((item) => (
          <article key={item.id} className="border-t border-sand-300 py-4">
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={`mt-2 h-2 w-2 shrink-0 rounded-full ${item.level === 'watch' ? 'bg-sandstone-500' : 'bg-leaf-500'}`}
              />
              <div className="flex-1">
                <p className="text-ink-900">{item.observation}</p>
                <p className="text-xs text-ink-500">{item.basis}</p>
                <p className="mt-2 text-sm text-ink-700">Suggested action: {item.action}</p>
                <button onClick={() => toggle(item.id)} className="mt-2 text-sm text-plum-700 underline">
                  {planned.includes(item.id) ? 'Planned (undo)' : 'Mark as planned'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {items.length > 4 && (
        <button onClick={() => setShowAll(!showAll)} className="mt-2 text-sm text-ink-500 hover:text-ink-900">
          {showAll ? 'Show fewer' : `Show all ${items.length}`}
        </button>
      )}
    </section>
  )
}