import { useState } from 'react'
import { cities } from '../../data/cities'
import { destinations } from '../../data/destinations'
import {
  budgetOptions,
  crowdPreferences,
  dayOptions,
  hourOptions,
  interests,
  paces,
  transports,
} from '../../data/plannerOptions'
import OptionChips from '../shared/OptionChips'
import type { Interest } from '../../types/destination'
import type { Preferences } from '../../types/planner'

const stepTitles = ['Start and time', 'Interests', 'Budget and pace', 'Crowds and transport']

type Props = {
  prefs: Preferences
  onChange: (patch: Partial<Preferences>) => void
  onGenerate: () => void
  onDemo: () => void
}

export default function PlannerWizard({ prefs, onChange, onGenerate, onDemo }: Props) {
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const starts = destinations.filter((item) => item.cityId === prefs.cityId)
  const pilot = cities.find((city) => city.status === 'pilot')
  const planned = cities.filter((city) => city.status === 'planned').map((city) => city.name)

  function toggleInterest(item: Interest) {
    onChange({
      interests: prefs.interests.includes(item)
        ? prefs.interests.filter((entry) => entry !== item)
        : [...prefs.interests, item],
    })
  }

  function next() {
    if (step === 1 && prefs.interests.length === 0) {
      setError('Choose at least one interest.')
      return
    }
    setError('')
    setStep(step + 1)
  }

  const selectClass =
    'mt-1 w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-ink-900 outline-none focus:border-plum-600'

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-sandstone-600">
        Step {step + 1} of {stepTitles.length}
      </p>
      <h1 className="mt-2 text-4xl font-semibold text-plum-900">{stepTitles[step]}</h1>
      <div className="mt-4 h-1 rounded-full bg-cream-100">
        <div className="h-1 rounded-full bg-plum-600 transition-all" style={{ width: `${((step + 1) / stepTitles.length) * 100}%` }} />
      </div>

      <div className="mt-8 space-y-6">
        {step === 0 && (
          <>
            <p className="text-sm text-ink-500">
              Pilot city: {pilot?.name}. Planned next: {planned.join(', ')} (no data yet).
            </p>
            <label className="block text-sm text-ink-700">
              Starting point
              <select value={prefs.startId} onChange={(e) => onChange({ startId: e.target.value })} className={selectClass}>
                {starts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <div>
              <p className="mb-2 text-sm text-ink-700">How many days?</p>
              <OptionChips
                options={dayOptions}
                selected={[prefs.days]}
                onToggle={(value) => onChange({ days: value })}
                format={(value) => `${value} day${value > 1 ? 's' : ''}`}
              />
            </div>
            <div>
              <p className="mb-2 text-sm text-ink-700">Hours available each day</p>
              <OptionChips
                options={hourOptions}
                selected={[prefs.hoursPerDay]}
                onToggle={(value) => onChange({ hoursPerDay: value })}
                format={(value) => `${value} hours`}
              />
            </div>
          </>
        )}
        {step === 1 && (
          <div>
            <p className="mb-2 text-sm text-ink-700">Pick everything you enjoy.</p>
            <OptionChips options={interests} selected={prefs.interests} onToggle={toggleInterest} />
          </div>
        )}
        {step === 2 && (
          <>
            <div>
              <p className="mb-2 text-sm text-ink-700">Total budget per person</p>
              <OptionChips
                options={budgetOptions}
                selected={[prefs.budget]}
                onToggle={(value) => onChange({ budget: value })}
                format={(value) => `₹${value.toLocaleString('en-IN')}`}
              />
            </div>
            <div>
              <p className="mb-2 text-sm text-ink-700">Travel pace</p>
              <OptionChips options={paces} selected={[prefs.pace]} onToggle={(value) => onChange({ pace: value })} />
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div>
              <p className="mb-2 text-sm text-ink-700">Crowd preference</p>
              <OptionChips options={crowdPreferences} selected={[prefs.crowd]} onToggle={(value) => onChange({ crowd: value })} />
              <p className="mt-2 text-xs text-ink-500">Crowd levels in this prototype are simulated demo data.</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-ink-700">How will you get around?</p>
              <OptionChips options={transports} selected={[prefs.transport]} onToggle={(value) => onChange({ transport: value })} />
            </div>
          </>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

      <div className="mt-10 flex flex-wrap items-center gap-3">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="rounded-md border border-sand-300 px-5 py-2.5 text-sm text-ink-700 hover:bg-cream-100">
            Back
          </button>
        )}
        {step < stepTitles.length - 1 ? (
          <button onClick={next} className="rounded-md bg-plum-700 px-5 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-plum-900">
            Next
          </button>
        ) : (
          <button onClick={onGenerate} className="rounded-md bg-plum-700 px-5 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-plum-900">
            Generate My Trip
          </button>
        )}
        <button onClick={onDemo} className="text-sm text-plum-700 underline">
          Use demo preferences (6 hours, ₹2,500, Heritage and Local art)
        </button>
      </div>
    </div>
  )
}