import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import heroImage from '../assets/udaipur-hero.jpg'

// Problem statements
const problems = [
  'Trips are planned around a few famous landmarks, while lesser-known heritage stays unseen.',
  'Local artisans and traditional crafts are hard for visitors to find and book.',
  'Hotels lack a simple view of their water, energy, and waste use.',
]

// Application modules
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
    text: 'Meet local artisans and join craft workshops.',
    to: '/kala-connect',
  },
  {
    name: 'GreenStay OS',
    text: 'A sustainability dashboard for hospitality partners.',
    to: '/hotel/greenstay',
  },
  {
    name: 'Community Discover',
    text: 'Verified hidden places submitted by the community.',
    to: '/community',
  },
]

// How it works
const steps = [
  'Tell us what you enjoy',
  'Get a personalised itinerary',
  'Explore, meet artisans, travel responsibly',
]

// Scroll animation component
function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}

// Landing Page
export default function Landing() {
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
              Udaipur, Rajasthan
            </p>

            <h1 className="mt-3 text-5xl font-semibold leading-tight md:text-6xl">
              Discover Hidden Gems. Connect with Culture. Travel with Purpose.
            </h1>

            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                to="/trip-planner"
                className="rounded-md bg-cream-50 px-5 py-3 text-sm font-medium text-plum-900 transition hover:bg-sand-200"
              >
                Plan my trip
              </Link>

              <Link
                to="/kala-connect"
                className="rounded-md border border-cream-50/70 px-5 py-3 text-sm font-medium transition hover:bg-cream-50/10"
              >
                Meet the artisans
              </Link>

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

          <h2 className="mt-2 max-w-2xl text-3xl font-semibold text-plum-900 md:text-4xl">
            Tourism in Udaipur is concentrated, and the people behind it are hard to find.
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
                  className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-sand-300 py-6 md:grid-cols-[4rem_1fr_2fr]"
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

      <section className="mx-auto max-w-5xl px-6 py-20">

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

              <p className="mt-2 text-lg text-ink-900">
                {step}
              </p>

            </Reveal>

          ))}

        </div>

      </section>

      {/* FINAL CALL TO ACTION */}

      <section className="bg-plum-900 px-6 py-20 text-cream-50">

        <Reveal>

          <div className="mx-auto max-w-3xl text-center">

            <h2 className="text-3xl font-semibold md:text-4xl">
              Ready to see Udaipur differently?
            </h2>

            <Link
              to="/login"
              className="mt-8 inline-block rounded-md bg-cream-50 px-6 py-3 text-sm font-medium text-plum-900 transition hover:bg-sand-200"
            >
              Get started
            </Link>

          </div>

        </Reveal>

      </section>

    </div>
  )
}