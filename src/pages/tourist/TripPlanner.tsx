import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cities } from '../../data/cities'
import { demoPreferences } from '../../data/plannerOptions'
import PlannerWizard from '../../components/tourist/PlannerWizard'
import ItineraryResult from '../../components/tourist/ItineraryResult'
import { consumeOptimizeRequest, loadSession, saveSession } from '../../services/plannerSession'
import { saveTrip } from '../../services/trips'
import { buildDay, generateItinerary, optimizeForCrowds, restoreDays } from '../../utils/planner'
import type { Destination } from '../../types/destination'
import type { PlannedStop, Preferences } from '../../types/planner'

type Phase = 'form' | 'loading' | 'result'
type Changes = { removed: Destination[]; added: Destination[] } | null

export default function TripPlanner() {
  const [session] = useState(loadSession)
  const [prefs, setPrefs] = useState<Preferences>(session ? session.prefs : demoPreferences)
  const [days, setDays] = useState<PlannedStop[][]>(() => (session ? restoreDays(session.prefs, session.days) : []))
  const [phase, setPhase] = useState<Phase>(() => (session && session.days.length > 0 ? 'result' : 'form'))
  const [loadingText, setLoadingText] = useState('Building your Udaipur trip')
  const [changes, setChanges] = useState<Changes>(null)
  const [removed, setRemoved] = useState<string[]>([])
  const [savedSignature, setSavedSignature] = useState('')
  const handled = useRef(false)

  const signature = days.map((day) => day.map((stop) => stop.destination.id).join(',')).join('|')
  const saved = savedSignature !== '' && savedSignature === signature

  function commit(nextPrefs: Preferences, nextDays: PlannedStop[][]) {
    setPrefs(nextPrefs)
    setDays(nextDays)
    saveSession({ prefs: nextPrefs, days: nextDays.map((day) => day.map((stop) => stop.destination.id)) })
  }

  function run(nextPrefs: Preferences, excluded: string[]) {
    setLoadingText('Building your Udaipur trip')
    setPhase('loading')
    setTimeout(() => {
      commit(nextPrefs, generateItinerary(nextPrefs, excluded))
      setChanges(null)
      setPhase('result')
    }, 800)
  }

  function generate() {
    setRemoved([])
    run(prefs, [])
  }

  function generateDemo() {
    setRemoved([])
    run(demoPreferences, [])
  }

  function optimize() {
    setLoadingText('Re-planning with crowd levels')
    setPhase('loading')
    setTimeout(() => {
      const result = optimizeForCrowds(prefs, days)
      commit(result.prefs, result.days)
      setChanges({ removed: result.removed, added: result.added })
      setPhase('result')
    }, 800)
  }

  function removeStop(id: string) {
    setRemoved([...removed, id])
    const nextDays = days
      .map((day) =>
        buildDay(
          prefs,
          day.filter((stop) => stop.destination.id !== id).map((stop) => stop.destination),
        ),
      )
      .filter((day) => day.length > 0)
    commit(prefs, nextDays)
    setChanges(null)
  }

  function moveStop(dayIndex: number, index: number, direction: -1 | 1) {
    const target = index + direction
    const nextDays = days.map((day, i) => {
      if (i !== dayIndex || target < 0 || target >= day.length) {
        return day
      }
      const list = day.map((stop) => stop.destination)
      const moved = list[index]
      list[index] = list[target]
      list[target] = moved
      return buildDay(prefs, list)
    })
    commit(prefs, nextDays)
    setChanges(null)
  }

  function handleSave() {
    const city = cities.find((item) => item.id === prefs.cityId)?.name ?? 'Udaipur'
    saveTrip({
      id: `t${Date.now()}`,
      name: prefs.days === 1 ? `${prefs.hoursPerDay} hours in ${city}` : `${prefs.days} days in ${city}`,
      savedOn: new Date().toISOString().slice(0, 10),
      prefs,
      days: days.map((day) => day.map((stop) => stop.destination.id)),
    })
    setSavedSignature(signature)
  }

  useEffect(() => {
    if (handled.current) {
      return
    }
    handled.current = true
    if (consumeOptimizeRequest() && days.length > 0) {
      optimize()
    }
  }, [])

  if (phase === 'loading') {
    return (
      <div className="mx-auto max-w-md px-6 py-32 text-center">
        <p className="font-display text-2xl text-plum-900">{loadingText}</p>
        <div className="mt-6 h-1.5 rounded-full bg-cream-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="h-1.5 rounded-full bg-plum-600"
          />
        </div>
      </div>
    )
  }

  if (phase === 'result') {
    return (
      <ItineraryResult
        prefs={prefs}
        days={days}
        changes={changes}
        saved={saved}
        onRemove={removeStop}
        onMove={moveStop}
        onSave={handleSave}
        onOptimize={optimize}
        onRegenerate={() => run(prefs, removed)}
        onEdit={() => setPhase('form')}
      />
    )
  }

  return (
    <PlannerWizard
      prefs={prefs}
      onChange={(patch) => setPrefs({ ...prefs, ...patch })}
      onGenerate={generate}
      onDemo={generateDemo}
    />
  )
}