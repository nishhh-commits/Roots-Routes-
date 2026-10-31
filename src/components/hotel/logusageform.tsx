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
  const first = Number(data[0][dataKey]) || 0
  const last = Number(data[data.length - 1][dataKey]) || 0

  // Calculate percentage change safely
  const change =
    first !== 0
      ? ((last - first) / first) * 100
      : 0

  return (
    <section className="rounded-lg border border-sand-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-plum-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-ink-500">
            {last} {unit}
          </p>
        </div>

        <span
          className={`text-sm font-medium ${
            change > 0 ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {change.toFixed(1)}%
        </span>
      </div>

      <div className="mt-5 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) => [`${value} ${unit}`, title]}
            />

            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}