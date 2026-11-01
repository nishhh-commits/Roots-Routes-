import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import heroImage from '../assets/udaipur-hero.jpg'
import Photo from '../components/shared/Photo'
import Footer from '../components/shared/Footer'
import { useAuth } from '../services/auth'

// Landing page content
const problems = [
  'Trips are planned around a few famous landmarks, while lesser-known heritage stays unseen.',
  'Local artisans and traditional crafts are hard for visitors to find and book.',
  'Hotels lack a simple view of their water, energy, and waste use.',
]

const modules = [
  {
    name: 'AI Trip Planner',
    text: 'Itineraries built around your interests, budget, time, and pace.',
    to: '/trip-planner',
  },
  {
    name: 'HeritageFlow',
    text: 'Crowd-aware visits with calmer alternatives nearby.',
    to: '/heritage-flow',
  },
  {
    name: 'KalaConnect',
    text: 'Meet local artisans and discover traditional craft workshops.',
    to: '/kala-connect',
  },
  {
    name: 'GreenStay OS',
    text: 'A sustainability dashboard for hospitality partners.',
    to: '/hotel/greenstay',
  },
  {
    name: 'Community Discover',
    text: 'Hidden places submitted by the community.',
    to: '/community',
  },
]

const steps = [
  'Tell us what you enjoy.',
  'Get a personalised itinerary.',
  'Explore, meet artisans, and travel responsibly.',
]

const travellerFlow = [
  'Your preferences',
  'Recommendation engine',
  'Places and cultural data',
  'Crowd signals (simulated)',
  'Route ordering',
  'Personalised itinerary',
]

const hotelFlow = [
  'Hotel usage data',
  'Metrics',
  'Insights',
  'Suggested actions',
]

const roadmap = [
  'Udaipur (pilot)',
  'Jaipur',
  'Jodhpur',
  'Rajasthan',
  'India',
]

// Scroll reveal animation
function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Flow diagram
function Flow({ steps: items }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center">
      {items.map((item, index) => (
        <li
          key={item}
          className="flex items-center gap-2 text-sm text-ink-900"
        >
          <span className="rounded border border-sand-300 bg-cream-50 px-3 py-1.5">
            {item}
          </span>

          {index < items.length - 1 && (
            <span
              className="hidden text-sandstone-500 md:inline"
              aria-hidden="true"
            >
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

// Main Landing Page
export default function Landing() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [starting, setStarting] = useState(false)

  async function startDemo() {
    setStarting(true)

    try {
      await login('tourist@demo.com', 'demo123', 'tourist')
      navigate('/trip-planner')
    } catch {
      navigate('/login')
    } finally {
      setStarting(false)
    }
  }

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative flex min-h-[88vh] flex-col text-cream-50">
        <img
          src={heroImage}
          alt="Udaipur city and lake"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-ink-900/55" />

        <div className="relative flex items-center justify-between px-6 py-5 md:px-12">
          <span className="font-display text-xl font-semibold">
            Roots & Routes
          </span>

          <Link to="/login" className="text-sm hover:underline">
            Log in
          </Link>
        </div>

        <div className="relative flex flex-1 items-end px-6 pb-16 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <p className="text-sm uppercase tracking-wide text-sand-300">
              Udaipur pilot prototype
            </p>

            <h1 className="mt-3 text-5xl font-semibold leading-tight md:text-6xl">
              Discover Hidden Gems. Connect with Culture. Travel with Purpose.
            </h1>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={startDemo}
                disabled={starting}
                className="rounded-md bg-cream-50 px-5 py-3 text-sm font-medium text-plum-900 transition hover:bg-sand-200 disabled:opacity-70"
              >
                {starting ? 'Starting...' : 'Try the demo'}
              </button>

              <a
                href="#how"
                className="rounded-md border border-cream-50/70 px-5 py-3 text-sm font-medium transition hover:bg-cream-50/10"
              >
                See how it works
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-sandstone-600">
            The problem
          </p>

          <h2 className="mt-2 max-w-3xl text-3xl font-semibold text-plum-900 md:text-4xl">
            Tourism concentrates visitors in a few places, while lesser-known
            places, artisans and sustainable options stay hard to discover.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {problems.map((problem) => (
            <Reveal key={problem}>
              <p className="border-t border-sand-300 pt-4 text-ink-700">
                {problem}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-12">
            <div className="overflow-hidden rounded-md md:col-span-7">
              <Photo
                src="/images/landing/editorial-1.jpg"
                alt="A lane in Udaipur's old city"
                className="h-72 w-full transition duration-700 hover:scale-105 md:h-[26rem]"
              />
            </div>

            <div className="flex flex-col justify-between gap-4 md:col-span-5">
              <div className="overflow-hidden rounded-md">
                <Photo
                  src="/images/landing/editorial-2.jpg"
                  alt="Lake Pichola at dusk"
                  className="h-48 w-full transition duration-700 hover:scale-105 md:h-56"
                />
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-sandstone-600">
                  The solution
                </p>

                <p className="mt-2 font-display text-2xl leading-snug text-plum-900">
                  Roots & Routes connects personalised planning with local
                  culture, crowd awareness and sustainable choices.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FIVE MODULES SECTION */}
      <section className="bg-cream-100 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-sandstone-600">
              One platform
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-plum-900 md:text-4xl">
              Five modules, one journey
            </h2>
          </Reveal>

          <div className="mt-10">
            {modules.map((module, index) => (
              <Reveal key={module.name}>
                <Link
                  to={module.to}
                  className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-sand-300 py-6 transition md:grid-cols-[4rem_1fr_2fr]"
                >
                  <span className="font-display text-2xl text-sandstone-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="text-xl font-semibold text-plum-900 transition group-hover:text-plum-600">
                    {module.name}
                  </h3>

                  <p className="col-span-2 text-ink-700 md:col-span-1">
                    {module.text}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        id="how"
        className="mx-auto max-w-5xl px-6 py-20"
      >
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-sandstone-600">
            How it works
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-plum-900 md:text-4xl">
            Three simple steps
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step}>
              <p className="font-display text-4xl text-leaf-500">
                {index + 1}
              </p>

              <p className="mt-2 text-lg text-ink-900">{step}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* UNDER THE HOOD SECTION */}
      <section className="bg-cream-100 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-sandstone-600">
              Under the hood
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-plum-900 md:text-4xl">
              What is actually running
            </h2>
          </Reveal>

          <div className="mt-8 space-y-8">
            <Reveal>
              <p className="mb-3 text-sm font-medium text-plum-900">
                For travellers
              </p>

              <Flow steps={travellerFlow} />
            </Reveal>

            <Reveal>
              <p className="mb-3 text-sm font-medium text-plum-900">
                For hotels
              </p>

              <Flow steps={hotelFlow} />
            </Reveal>
          </div>

          <p className="mt-8 max-w-3xl text-sm text-ink-500">
            The planner scores places with local logic, so it works without
            any AI service. Gemini is an optional extra for written summaries.
            Crowd levels and hotel figures in this prototype are simulated
            demo data.
          </p>

          <div className="mt-10">
            <p className="mb-3 text-sm font-medium text-plum-900">
              Roadmap (not built yet)
            </p>

            <Flow steps={roadmap} />

            <p className="mt-3 text-sm text-ink-500">
              Place data is organised by city, so new cities can be added
              without rebuilding the app.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="bg-plum-900 px-6 py-20 text-cream-50">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">
              See it plan a trip in under a minute
            </h2>

            <button
              onClick={startDemo}
              disabled={starting}
              className="mt-8 rounded-md bg-cream-50 px-6 py-3 text-sm font-medium text-plum-900 transition hover:bg-sand-200 disabled:opacity-70"
            >
              {starting ? 'Starting...' : 'Try the demo'}
            </button>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  )
}