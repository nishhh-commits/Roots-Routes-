import {
ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
} from 'recharts'

import type { MonthlyUsage } from '../../types/hotel'

type Props = {
title: string
unit: string
dataKey: 'water' | 'energy' | 'waste'
data: MonthlyUsage[]
color: string
}

export default function UsageChart({
title,
unit,
dataKey,
data,
color,
}: Props) {

// Check whether data is available
if (!data || data.length === 0) {
return (
<section className="rounded-lg border border-sand-200 bg-white p-5">
<h2 className="text-lg font-semibold text-plum-900">
{title}
</h2>

    <p className="mt-4 text-ink-500">
      No usage data available.
    </p>
  </section>
)

}

// Calculate first and latest month values
const first = data[0][dataKey]
const last = data[data.length - 1][dataKey]

// Calculate percentage change
const change =
first === 0
? 0
: Math.round(((last - first) / first) * 100)

return (
<section className="rounded-lg border border-sand-200 bg-white p-5">

  {/* Chart Heading */}

  <div className="flex items-baseline justify-between gap-2">

    <h2 className="text-lg font-semibold text-plum-900">
      {title}
    </h2>

    <p className="text-sm text-ink-500">
      {change > 0 ? '+' : ''}
      {change}% since {data[0].month}
    </p>

  </div>

  {/* Latest Usage */}

  <p className="mt-2 text-3xl font-semibold text-ink-900">

    {last.toLocaleString('en-IN')}

    <span className="text-base font-normal text-ink-500">
      {' '}{unit}
    </span>

  </p>

  {/* Line Chart */}

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

        <Tooltip />

        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5 }}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

</section>

)
}