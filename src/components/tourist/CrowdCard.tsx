import type { CrowdLevel, CrowdReport } from '../../types/crowd'
import { freshnessLabel, timeAgo } from '../../utils/freshness'

const rank: Record<CrowdLevel, number> = { Low: 1, Moderate: 2, High: 3 }

const meterColor: Record<CrowdLevel, string> = {
  Low: 'bg-leaf-500',
  Moderate: 'bg-sandstone-500',
  High: 'bg-plum-600',
}

function Meter({ level }: { level: CrowdLevel }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {[1, 2, 3].map((segment) => (
        <span
          key={segment}
          className={`h-2 w-8 rounded-full ${segment <= rank[level] ? meterColor[level] : 'bg-cream-100'}`}
        />
      ))}
    </div>
  )
}

type Props = {
  report: CrowdReport
  all: CrowdReport[]
}

export default function CrowdCard({ report, all }: Props) {
  const quieter = report.alternativeIds
    .map((id) => all.find((item) => item.destinationId === id))
    .filter((item): item is CrowdReport => item !== undefined && rank[item.level] < rank[report.level])

  return (
    <article className="border-t border-sand-300 py-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-plum-900">{report.name}</h3>
          <p className="text-sm text-ink-500">{report.area}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Meter level={report.level} />
          <p className="text-sm font-medium text-ink-900">{report.level} crowd</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-ink-700">
        {timeAgo(report.minutesAgo)} · {freshnessLabel(report.minutesAgo)} · {report.reports} reports · {report.confidence} confidence
      </p>
      <span className="mt-2 inline-block rounded bg-sand-200 px-2 py-0.5 text-xs text-ink-700">Sample crowd report</span>
      {freshnessLabel(report.minutesAgo) === 'Stale' && (
        <p className="mt-2 text-sm text-ink-500">This report is old. Check on site before you travel.</p>
      )}
      {quieter.length > 0 && (
        <p className="mt-3 text-sm text-ink-700">
          Quieter nearby: {quieter.map((item) => `${item.name} (${item.level})`).join(', ')}
        </p>
      )}
    </article>
  )
}