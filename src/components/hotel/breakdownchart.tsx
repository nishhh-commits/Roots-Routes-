import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
} from 'recharts'

type Breakdown = {
key: string
title: string
unit: string
color: string
items: {
name: string
value: number
}[]
}

export default function BreakdownChart({
breakdown,
}: {
breakdown: Breakdown
}) {
return (
<section className="rounded-lg border border-sand-200 bg-white p-5">
<h3 className="text-lg font-semibold text-plum-900">
{breakdown.title}
</h3>

  <p className="text-sm text-ink-500">
    Latest month, in {breakdown.unit}
  </p>

  <div className="mt-4 h-60">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={breakdown.items}
        layout="vertical"
        margin={{ left: 8 }}
      >
        <XAxis
          type="number"
          tick={{ fontSize: 12 }}
          stroke="#6b6275"
        />

        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 12 }}
          stroke="#6b6275"
          width={110}
        />

        <Tooltip />

        <Bar
          dataKey="value"
          fill={breakdown.color}
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</section>

)
}