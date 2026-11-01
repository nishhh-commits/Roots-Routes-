import { summariseFeed } from '../../ingestion/stats'
import type { FeedMessage } from '../../hooks/useReadingFeed'
import type { Reading } from '../../types/reading'
import StorageStatus from './StorageStatus'

type Props = {
  readings: Reading[]
  loading: boolean
  pending: boolean
  message: FeedMessage | null
  onSimulate: () => void
}

const resourceName = { water: 'Water', energy: 'Energy', waste: 'Waste' }

const messageStyle = {
  success: 'text-leaf-700',
  error: 'text-red-700',
  info: 'text-ink-700',
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'medium' })
}

export default function SimulatedFeedPanel({ readings, loading, pending, message, onSimulate }: Props) {
  const simulated = readings.filter((item) => item.source === 'simulated-device')
  const summary = summariseFeed(simulated)

  return (
    <section className="mt-12">
      <p className="font-type text-sm uppercase tracking-wide text-terracotta-dark">Smart Integration Demo</p>
      <h2 className="mt-1 text-2xl font-semibold text-plum-900">Simulated Device Feed</h2>

      <div className="mt-3 max-w-2xl border border-dashed border-terracotta bg-paper-clean p-4">
        <p className="font-medium text-ink-900">No physical meter is connected.</p>
        <p className="mt-1 text-sm text-ink-700">
          The button below generates a sample reading to show how a meter or hotel system feed could reach GreenStay OS. It is a demonstration, not live monitoring.
        </p>
      </div>

      <p className="mt-4 font-type text-xs text-ink-500">
        Simulated device → validation → storage → this dashboard
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          onClick={onSimulate}
          disabled={pending || loading}
          className="rounded-md bg-plum-700 px-5 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-plum-900 disabled:opacity-60"
        >
          {pending ? 'Sending reading...' : 'Simulate Incoming Reading'}
        </button>
        <StorageStatus />
      </div>

      <p role="status" aria-live="polite" className={`mt-3 min-h-6 text-sm ${message ? messageStyle[message.kind] : ''}`}>
        {message ? message.text : ''}
      </p>

      <div className="mt-4 max-w-2xl">
        <h3 className="text-lg font-semibold text-plum-900">Latest received reading</h3>
        {loading ? (
          <p className="mt-2 text-ink-500">Loading readings...</p>
        ) : summary.latest ? (
          <div className="mt-2 border-t border-dashed border-sand-300 py-3">
            <p className="font-display text-3xl font-semibold text-ink-900">
              {summary.latest.value}{' '}
              <span className="font-sans text-base font-normal text-ink-500">{summary.latest.unit}</span>{' '}
              <span className="font-sans text-base font-normal text-ink-700">
                {resourceName[summary.latest.resource].toLowerCase()}
              </span>
            </p>
            <p className="mt-1 text-sm text-ink-700">
              Device {summary.latest.deviceId} · {formatTime(summary.latest.recordedAt)}
            </p>
            <span className="mt-2 inline-block rounded-sm border border-dashed border-terracotta px-2 py-0.5 font-type text-xs text-terracotta-dark">
              Source: Simulated device feed
            </span>
          </div>
        ) : (
          <p className="mt-2 border-t border-dashed border-sand-300 py-3 text-ink-500">
            No simulated readings yet. Press the button to send one.
          </p>
        )}
      </div>

      {summary.perResource.length > 0 && (
        <div className="mt-4 max-w-2xl">
          <h3 className="text-lg font-semibold text-plum-900">Simulated readings by resource</h3>
          {summary.perResource.map((item) => (
            <div key={item.resource} className="border-t border-dashed border-sand-300 py-3 text-sm text-ink-700">
              <p className="text-ink-900">
                {resourceName[item.resource]}: latest {item.latest.value} {item.latest.unit}
              </p>
              <p>
                {item.changePct === null
                  ? 'No earlier simulated reading to compare with.'
                  : `${item.changePct > 0 ? '+' : ''}${item.changePct}% compared with the previous simulated reading (${item.previous?.value} ${item.latest.unit}).`}
              </p>
              <p className="font-type text-xs text-ink-500">
                {item.count} simulated reading(s), total {item.total} {item.latest.unit}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}