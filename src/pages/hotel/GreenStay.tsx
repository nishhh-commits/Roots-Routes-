<<<<<<< HEAD
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
=======
import { useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

import StorageStatus from '../../components/hotel/StorageStatus'
import type { MonthlyUsage } from '../../types/hotel'

const demoUsage: MonthlyUsage[] = [
  { month: 'May', water: 4200, energy: 3100, waste: 180 },
  { month: 'Jun', water: 3900, energy: 2950, waste: 165 },
  { month: 'Jul', water: 4100, energy: 3200, waste: 170 },
  { month: 'Aug', water: 3600, energy: 2800, waste: 150 },
  { month: 'Sep', water: 3400, energy: 2650, waste: 140 },
  { month: 'Oct', water: 3200, energy: 2500, waste: 125 },
]

type ChartProps = {
  title: string
  unit: string
  dataKey: 'water' | 'energy' | 'waste'
  color: string
  data: MonthlyUsage[]
}

function UsageChart({
  title,
  unit,
  dataKey,
  color,
  data,
}: ChartProps) {
  const latest = data[data.length - 1]

  return (
    <section className="rounded-xl border border-sand-200 bg-white p-5">
      <h3 className="text-lg font-semibold text-plum-900">
        {title}
      </h3>

      <p className="mt-2 text-2xl font-semibold text-ink-900">
        {latest[dataKey].toLocaleString('en-IN')}
        <span className="ml-2 text-sm font-normal text-ink-500">
          {unit}
        </span>
      </p>

      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              stroke="#e9dcc6"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              stroke="#6b6275"
            />

            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#6b6275"
              width={55}
            />

            <Tooltip
              formatter={(value) => [
                `${Number(value).toLocaleString('en-IN')} ${unit}`,
                title,
              ]}
            />

            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default function GreenStay() {
  const [hotelName, setHotelName] = useState(
    'Lakeview Heritage Hotel',
  )

  const latest = demoUsage[demoUsage.length - 1]

  const metrics = [
    {
      title: 'Water consumption',
      value: latest.water,
      unit: 'litres',
      color: 'text-blue-700',
    },
    {
      title: 'Electricity usage',
      value: latest.energy,
      unit: 'kWh',
      color: 'text-amber-700',
    },
    {
      title: 'Waste generated',
      value: latest.waste,
      unit: 'kg',
      color: 'text-teal-700',
    },
  ]

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-10 sm:px-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700">
            Green Stay OS
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-plum-900 sm:text-4xl">
            Sustainable hospitality dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-ink-500">
            Monitor resource consumption and understand your
            hotel's sustainability patterns.
          </p>
        </div>

        <span className="w-fit rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm text-teal-800">
          Prototype dashboard
        </span>
      </header>

      <section className="mt-8 rounded-xl border border-sand-200 bg-white p-5">
        <label
          htmlFor="hotel-name"
          className="block text-sm font-medium text-ink-700"
        >
          Hotel name
        </label>

        <input
          id="hotel-name"
          value={hotelName}
          onChange={(event) => setHotelName(event.target.value)}
          className="mt-2 w-full max-w-md rounded-lg border border-sand-300 bg-paper-clean px-3 py-2 text-plum-900 outline-none focus:border-plum-500"
        />

        <p className="mt-2 text-xs text-ink-500">
          This name is currently stored only in this page's local state.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-plum-900">
          Resource overview
        </h2>

        <p className="mt-1 text-sm text-ink-500">
          October sample readings. These are demonstration values,
          not live sensor measurements.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <article
              key={metric.title}
              className="rounded-xl border border-sand-200 bg-white p-5"
            >
              <p className="text-sm text-ink-500">
                {metric.title}
              </p>

              <p className={`mt-3 text-3xl font-semibold ${metric.color}`}>
                {metric.value.toLocaleString('en-IN')}
                <span className="ml-2 text-sm font-normal text-ink-500">
                  {metric.unit}
                </span>
              </p>

              <p className="mt-2 text-xs text-ink-500">
                Monthly demonstration reading
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-plum-900">
          Monthly resource trends
        </h2>

        <p className="mt-1 text-sm text-ink-500">
          Sample resource usage across six months.
        </p>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <UsageChart
            title="Water consumption"
            unit="litres"
            dataKey="water"
            data={demoUsage}
            color="#3978A8"
          />

          <UsageChart
            title="Electricity consumption"
            unit="kWh"
            dataKey="energy"
            data={demoUsage}
            color="#C58A32"
          />

          <UsageChart
            title="Waste generated"
            unit="kg"
            dataKey="waste"
            data={demoUsage}
            color="#278477"
          />
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-sand-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-plum-900">
          Sustainability suggestions
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="rounded-lg bg-blue-50 p-4">
            <h3 className="font-medium text-blue-900">
              Water management
            </h3>
            <p className="mt-2 text-sm text-blue-800">
              Monitor consumption and investigate unusual increases.
            </p>
          </article>

          <article className="rounded-lg bg-amber-50 p-4">
            <h3 className="font-medium text-amber-900">
              Energy efficiency
            </h3>
            <p className="mt-2 text-sm text-amber-800">
              Review electricity usage and encourage efficient
              lighting and cooling.
            </p>
          </article>

          <article className="rounded-lg bg-teal-50 p-4">
            <h3 className="font-medium text-teal-900">
              Waste reduction
            </h3>
            <p className="mt-2 text-sm text-teal-800">
              Track waste generation and identify reduction
              opportunities.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-sand-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-plum-900">
          Data storage and hotel access
        </h2>

        <p className="mt-2 text-sm text-ink-500">
          Sign in with a configured hotel account to check Firebase
          storage access.
        </p>

        <div className="mt-4">
          <StorageStatus />
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-ink-500">
        Roots &amp; Routes · Green Stay OS · Demonstration data
      </p>
    </main>
>>>>>>> origin/feature/nisha-firestore
  )
}