import { destinations } from '../data/destinations'
import { crowdLevel, crowdRank } from '../services/crowd'
import type { CrowdLevel } from '../types/crowd'
import type { Destination } from '../types/destination'
import type {
  Check,
  CrowdPreference,
  Pace,
  PlannedStop,
  Preferences,
  Reason,
  Transport,
} from '../types/planner'

export type {
  Check,
  CrowdPreference,
  Pace,
  PlannedStop,
  Preferences,
  Reason,
  Transport,
} from '../types/planner'

const paceFactor: Record<Pace, number> = {
  Relaxed: 1.1,
  Balanced: 1,
  'Fast-paced': 0.85,
}

const maxStops: Record<Pace, number> = {
  Relaxed: 4,
  Balanced: 5,
  'Fast-paced': 6,
}

const speedKmh: Record<Transport, number> = {
  Walking: 4,
  'Public transport': 15,
  'Two-wheeler': 25,
  Car: 25,
}

const costPerKm: Record<Transport, number> = {
  Walking: 0,
  'Public transport': 8,
  'Two-wheeler': 5,
  Car: 15,
}

const crowdWeight: Record<CrowdPreference, number> = {
  'Avoid crowded': 2.2,
  Balanced: 0.6,
  'Crowds are okay': 0,
}

const DAY_START = 9 * 60

function money(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

function distanceKm(a: Destination, b: Destination) {
  const rad = Math.PI / 180
  const dLat = (b.lat - a.lat) * rad
  const dLng = (b.lng - a.lng) * rad

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) *
      Math.cos(b.lat * rad) *
      Math.sin(dLng / 2) ** 2

  return 2 * 6371 * Math.asin(Math.sqrt(h)) * 1.3
}

function findStart(prefs: Preferences) {
  const inCity = destinations.filter(
    (item) => item.cityId === prefs.cityId,
  )

  return (
    inCity.find((item) => item.id === prefs.startId) ??
    inCity[0] ??
    destinations[0]
  )
}

function formatTime(total: number) {
  const hours = Math.floor(total / 60) % 24
  const minutes = total % 60
  const suffix = hours >= 12 ? 'PM' : 'AM'
  const display = hours % 12 === 0 ? 12 : hours % 12

  return `${display}:${String(minutes).padStart(2, '0')} ${suffix}`
}

function score(prefs: Preferences, item: Destination) {
  const matches = item.interests.filter((interest) =>
    prefs.interests.includes(interest),
  ).length

  const wantsLocal =
    prefs.interests.includes('Local art') ||
    prefs.interests.includes('Culture')

  const localBonus = item.local && wantsLocal ? 1.5 : 0

  const famousBonus =
    item.famous && prefs.crowd !== 'Avoid crowded' ? 2 : 0

  const noMatch = matches === 0 ? -2 : 0

  const crowdPenalty =
    crowdRank[crowdLevel(item.id)] * crowdWeight[prefs.crowd]

  return (
    matches * 3 +
    localBonus +
    famousBonus +
    noMatch -
    crowdPenalty -
    item.entryCost / 1000
  )
}

function buildReasons(
  prefs: Preferences,
  stop: PlannedStop,
  index: number,
): Reason[] {
  const { destination, level } = stop
  const reasons: Reason[] = []

  const matches = destination.interests.filter((interest) =>
    prefs.interests.includes(interest),
  )

  if (matches.length > 0) {
    reasons.push({
      kind: 'interest',
      text: `Matches your interest in ${matches.join(' and ')}.`,
    })
  }

  if (destination.local) {
    reasons.push({
      kind: 'local',
      text: 'A local cultural experience that connects you with an artisan.',
    })
  }

  reasons.push({
    kind: 'time',
    text: `Takes about ${stop.visitMinutes} min, which fits your ${prefs.hoursPerDay}-hour day.`,
  })

  const cost = destination.entryCost + stop.travelCost

  reasons.push({
    kind: 'budget',
    text:
      cost === 0
        ? 'Free to visit and reach.'
        : `Estimated ${money(cost)} including travel.`,
  })

  const highText =
    prefs.crowd === 'Crowds are okay'
      ? 'High crowd level (simulated). You said crowds are okay.'
      : 'High crowd level (simulated), kept because it matches your interests. HeritageFlow can suggest quieter options.'

  const crowdText: Record<CrowdLevel, string> = {
    Low: 'Low crowd level (simulated), so it should feel calm.',
    Moderate: 'Moderate crowd level (simulated).',
    High: highText,
  }

  reasons.push({
    kind: 'crowd',
    text: crowdText[level],
  })

  if (index > 0 && stop.travelKm <= 2) {
    reasons.push({
      kind: 'proximity',
      text: `Close to the previous stop (${stop.travelKm} km).`,
    })
  }

  if (prefs.pace === 'Relaxed' && destination.visitMinutes <= 90) {
    reasons.push({
      kind: 'pace',
      text: 'Leaves room to linger at a relaxed pace.',
    })
  }

  if (
    prefs.pace === 'Fast-paced' &&
    destination.visitMinutes <= 60
  ) {
    reasons.push({
      kind: 'pace',
      text: 'A quick visit that suits a fast pace.',
    })
  }

  return reasons
}

export function buildDay(
  prefs: Preferences,
  list: Destination[],
): PlannedStop[] {
  let previous = findStart(prefs)
  let clock = DAY_START

  return list.map((destination, index) => {
    const travelKm = distanceKm(previous, destination)

    const travelMinutes = Math.round(
      (travelKm / speedKmh[prefs.transport]) * 60,
    )

    const visitMinutes = Math.round(
      destination.visitMinutes * paceFactor[prefs.pace],
    )

    clock += travelMinutes

    const startTime = formatTime(clock)

    clock += visitMinutes
    previous = destination

    const base: PlannedStop = {
      destination,
      level: crowdLevel(destination.id),
      startTime,
      visitMinutes,
      travelKm: Math.round(travelKm * 10) / 10,
      travelMinutes,
      travelCost: Math.round(
        travelKm * costPerKm[prefs.transport],
      ),
      reason: '',
      reasons: [],
    }

    const reasons = buildReasons(prefs, base, index)

    return {
      ...base,
      reasons,
      reason: reasons
        .slice(0, 2)
        .map((item) => item.text)
        .join(' '),
    }
  })
}

function orderByProximity(
  start: Destination,
  list: Destination[],
) {
  const ordered: Destination[] = []
  const remaining = [...list]

  let current = start

  while (remaining.length > 0) {
    remaining.sort(
      (a, b) =>
        distanceKm(current, a) - distanceKm(current, b),
    )

    const next = remaining.shift()

    if (!next) {
      break
    }

    ordered.push(next)
    current = next
  }

  return ordered
}

function layout(
  prefs: Preferences,
  list: Destination[],
): PlannedStop[][] {
  const ordered = orderByProximity(findStart(prefs), list)

  const size = Math.max(
    1,
    Math.ceil(ordered.length / prefs.days),
  )

  const result: PlannedStop[][] = []

  for (let index = 0; index < ordered.length; index += size) {
    result.push(
      buildDay(prefs, ordered.slice(index, index + size)),
    )
  }

  return result
}

function dayMinutes(day: PlannedStop[]) {
  return day.reduce(
    (sum, stop) =>
      sum + stop.visitMinutes + stop.travelMinutes,
    0,
  )
}

export function summarize(
  prefs: Preferences,
  days: PlannedStop[][],
) {
  const stops = days.flat()

  const included = stops.map(
    (stop) => stop.destination.id,
  )

  return {
    stops: stops.length,

    minutes: stops.reduce(
      (sum, stop) =>
        sum + stop.visitMinutes + stop.travelMinutes,
      0,
    ),

    cost: stops.reduce(
      (sum, stop) =>
        sum +
        stop.destination.entryCost +
        stop.travelCost,
      0,
    ),

    local: stops.filter(
      (stop) => stop.destination.local,
    ).length,

    highIncluded: stops.filter(
      (stop) => stop.level === 'High',
    ).length,

    highLeftOut: destinations.filter(
      (item) =>
        item.cityId === prefs.cityId &&
        crowdLevel(item.id) === 'High' &&
        !included.includes(item.id),
    ).length,
  }
}

function overLimit(
  prefs: Preferences,
  days: PlannedStop[][],
) {
  const longest = Math.max(
    0,
    ...days.map(dayMinutes),
  )

  return (
    longest > prefs.hoursPerDay * 60 ||
    summarize(prefs, days).cost > prefs.budget
  )
}

export function generateItinerary(
  prefs: Preferences,
  excludedIds: string[] = [],
): PlannedStop[][] {
  const start = findStart(prefs)

  const timeCap = prefs.hoursPerDay * 60 * prefs.days
  const stopCap = maxStops[prefs.pace] * prefs.days

  const ranked = destinations
    .filter((item) => item.cityId === prefs.cityId)
    .filter((item) => item.id !== prefs.startId)
    .filter((item) => !excludedIds.includes(item.id))
    .filter(
      (item) =>
        prefs.transport !== 'Walking' ||
        distanceKm(start, item) <= 6,
    )
    .map((item) => ({
      item,
      value: score(prefs, item),
    }))
    .sort((a, b) => b.value - a.value)

  const picked: Destination[] = []

  let minutes = 0
  let spend = 0
  let locals = 0

  for (const { item } of ranked) {
    const need =
      Math.round(
        item.visitMinutes * paceFactor[prefs.pace],
      ) + 10

    const cost = item.entryCost + 40

    const tooMany = picked.length >= stopCap
    const tooLong = minutes + need > timeCap
    const tooCostly = spend + cost > prefs.budget
    const tooLocal =
      Boolean(item.local) && locals >= 2 * prefs.days

    if (tooMany || tooLong || tooCostly || tooLocal) {
      continue
    }

    picked.push(item)
    minutes += need
    spend += cost

    if (item.local) {
      locals += 1
    }
  }

  let chosen = picked
  let days = layout(prefs, chosen)

  while (chosen.length > 1 && overLimit(prefs, days)) {
    chosen = chosen.slice(0, -1)
    days = layout(prefs, chosen)
  }

  return days
}

export function explainItinerary(
  prefs: Preferences,
  days: PlannedStop[][],
): Check[] {
  const stops = days.flat()
  const summary = summarize(prefs, days)

  const covered = prefs.interests.filter((interest) =>
    stops.some((stop) =>
      stop.destination.interests.includes(interest),
    ),
  )

  const missing = prefs.interests.filter(
    (interest) => !covered.includes(interest),
  )

  const longest = Math.max(
    0,
    ...days.map(dayMinutes),
  )

  const hours = Math.round(longest / 6) / 10

  const checks: Check[] = [
    {
      ok: missing.length === 0,
      text:
        missing.length === 0
          ? `Matches your interests: ${covered.join(', ')}.`
          : `Covers ${covered.join(', ') || 'none'}. No suitable stop found for ${missing.join(', ')}.`,
    },
    {
      ok: longest <= prefs.hoursPerDay * 60,
      text: `Fits your time: longest day is about ${hours} h of ${prefs.hoursPerDay} h.`,
    },
    {
      ok: summary.cost <= prefs.budget,
      text: `Fits your budget: about ${money(summary.cost)} of ${money(prefs.budget)}.`,
    },
  ]

  if (summary.highIncluded === 0) {
    const left =
      summary.highLeftOut > 0
        ? ` ${summary.highLeftOut} left out.`
        : ''

    checks.push({
      ok: true,
      text: `Avoids high-crowd places (simulated data).${left}`,
    })
  } else {
    checks.push({
      ok: prefs.crowd === 'Crowds are okay',
      text:
        prefs.crowd === 'Crowds are okay'
          ? `Includes ${summary.highIncluded} busy place(s) (simulated), which you said is fine.`
          : `Includes ${summary.highIncluded} high-crowd place(s) (simulated). Optimize to swap them.`,
    })
  }

  checks.push({
    ok: summary.local > 0,
    text:
      summary.local > 0
        ? `Includes ${summary.local} local cultural experience(s).`
        : 'No local experience fits. Add Local art or Culture to your interests.',
  })

  return checks
}

export function restoreDays(
  prefs: Preferences,
  ids: string[][],
): PlannedStop[][] {
  return ids
    .map((day) =>
      day
        .map((id) =>
          destinations.find((item) => item.id === id),
        )
        .filter(
          (item): item is Destination => Boolean(item),
        ),
    )
    .filter((day) => day.length > 0)
    .map((day) => buildDay(prefs, day))
}

export function optimizeForCrowds(
  prefs: Preferences,
  days: PlannedStop[][],
) {
  const nextPrefs: Preferences = {
    ...prefs,
    crowd: 'Avoid crowded',
  }

  const busy = destinations
    .filter((item) => item.cityId === prefs.cityId)
    .filter((item) => crowdLevel(item.id) === 'High')
    .map((item) => item.id)

  const nextDays = generateItinerary(nextPrefs, busy)

  const before = days.flat().map(
    (stop) => stop.destination,
  )

  const after = nextDays.flat().map(
    (stop) => stop.destination,
  )

  return {
    prefs: nextPrefs,
    days: nextDays,

    removed: before.filter(
      (item) =>
        !after.some((other) => other.id === item.id),
    ),

    added: after.filter(
      (item) =>
        !before.some((other) => other.id === item.id),
    ),
  }
}