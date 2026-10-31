import { hotelProfile, usageUnits } from '../../data/hotel'
import { breakdowns, indicators } from '../../data/sustainability'
import { useUsage } from '../../hooks/useUsage'

import UsageChart from '../../components/hotel/UsageChart'
import IndicatorList from '../../components/hotel/IndicatorList'
import BreakdownChart from '../../components/hotel/BreakdownChart'
import LogUsageForm from '../../components/hotel/LogUsageForm'

type Key = 'water' | 'energy' | 'waste'

export default function GreenStay() {
  const { usage, addMonth, reset } = useUsage()

  const first = usage[0]
  const last = usage[usage.length - 1]

  function change(key: Key): number {
    if (!first || !last) return 0

    const firstValue = first[key]
    const lastValue = last[key]

    if (firstValue === 0) return 0

    return Math.round(
      ((lastValue - firstValue) / firstValue) * 100
    )
  }

  const insights =
    first && last
      ? [
          `Water use changed by ${change('water')}% between ${first.month} and ${last.month}.`,

          `Energy use changed by ${change('energy')}% over the same period.`,

          `Waste per month changed by ${change('waste')}%, from ${first.waste} kg to ${last.waste} kg.`,

          'Cooling is the largest share of energy use in the sample breakdown, so it is the first place to look for savings.',
        ]
      : ['No usage data available. Please log a month to see insights.']

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">

      <p className="text-sm font-medium uppercase tracking-wide text-leaf-700">
        GreenStay OS
      </p>

      <h1 className="mt-2 text-4xl font-semibold text-plum-900">
        {hotelProfile.name}
      </h1>

      <p className="mt-3 max-w-2xl text-ink-500">
        Resource trends for {hotelProfile.rooms} rooms in {hotelProfile.city}.
        {hotelProfile.isDemo &&
          ' Starter figures are demo data for the prototype.'}
      </p>

      {/* Trends */}
      <h2 className="mt-10 text-2xl font-semibold text-plum-900">
        Trends
      </h2>

      <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UsageChart
          title="Water"
          unit={usageUnits.water}
          dataKey="water"
          data={usage}
          color="#1e8f7b"
        />

        <UsageChart
          title="Energy"
          unit={usageUnits.energy}
          dataKey="energy"
          data={usage}
          color="#b8794a"
        />

        <UsageChart
          title="Waste"
          unit={usageUnits.waste}
          dataKey="waste"
          data={usage}
          color="#5b3590"
        />
      </div>

      {/* Log Usage */}
      <h2 className="mt-12 text-2xl font-semibold text-plum-900">
        Log a month
      </h2>

      <div className="mt-4">
        <LogUsageForm onSubmit={addMonth} />

        <button
          type="button"
          onClick={reset}
          className="mt-4 text-sm text-ink-500 hover:text-ink-900"
        >
          Reset to demo data
        </button>
      </div>

      {/* Sustainability Indicators */}
      <h2 className="mt-12 text-2xl font-semibold text-plum-900">
        Sustainability indicators
      </h2>

      <div className="mt-4 max-w-3xl">
        <IndicatorList indicators={indicators} />
      </div>

      {/* Breakdown */}
      <h2 className="mt-12 text-2xl font-semibold text-plum-900">
        Where it goes
      </h2>

      <p className="mt-1 text-sm text-ink-500">
        Sample breakdown figures (demo data).
      </p>

      <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {breakdowns.map((breakdown) => (
          <BreakdownChart
            key={breakdown.key}
            breakdown={breakdown}
          />
        ))}
      </div>

      {/* Insights */}
      <h2 className="mt-12 text-2xl font-semibold text-plum-900">
        Insights
      </h2>

      <ul className="mt-4 max-w-3xl">
        {insights.map((insight, index) => (
          <li
            key={index}
            className="border-t border-sand-300 py-3 text-ink-700"
          >
            {insight}
          </li>
        ))}
      </ul>

    </div>
  )
}