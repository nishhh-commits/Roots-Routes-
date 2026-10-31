import { motion } from 'framer-motion'

type Indicator = {
id: string
label: string
value: number
unit: string
target: number
higherIsBetter: boolean
}

function progress(indicator: Indicator) {
const ratio = indicator.higherIsBetter
? indicator.value / indicator.target
: indicator.target / indicator.value

return Math.min(Math.round(ratio * 100), 100)
}

export default function IndicatorList({
indicators,
}: {
indicators: Indicator[]
}) {
return (
<div>
{indicators.map((indicator) => {
const percent = progress(indicator)
const onTrack = percent >= 100

    return (
      <div key={indicator.id} className="border-t border-sand-300 py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-ink-900">{indicator.label}</p>

          <p className="text-sm text-ink-500">
            {indicator.value}{indicator.unit} now · target {indicator.target}{indicator.unit}
          </p>
        </div>

        <div className="mt-3 h-2 rounded-full bg-cream-100">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={
              onTrack
                ? 'h-2 rounded-full bg-leaf-500'
                : 'h-2 rounded-full bg-sandstone-500'
            }
          />
        </div>

        <p className="mt-2 text-xs text-ink-500">
          {onTrack
            ? 'Target met'
            : `${percent}% of the way to target`}
        </p>
      </div>
    )
  })}
</div>

)
}