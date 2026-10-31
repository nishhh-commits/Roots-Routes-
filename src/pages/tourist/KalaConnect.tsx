import { useState } from 'react'
import { artisans } from '../../data/artisans'
import ArtisanCard from '../../components/tourist/ArtisanCard'

const categories = [
  'All',
  'Painting',
  'Textile',
  'Puppetry',
  'Metalwork',
]

export default function KalaConnect() {
  const [active, setActive] = useState('All')

  const visible =
    active === 'All'
      ? artisans
      : artisans.filter(
          (artisan) => artisan.category === active
        )

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">

      <p className="text-sm font-medium uppercase tracking-wide text-sandstone-600">
        KalaConnect
      </p>

      <h1 className="mt-2 text-4xl font-semibold text-plum-900">
        Meet the makers of Udaipur
      </h1>

      <p className="mt-3 max-w-2xl text-ink-500">
        Discover local artisans, learn their craft, and book
        a workshop. Profiles shown are prototype data.
      </p>

      {/* CATEGORY FILTERS */}

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={
              active === category
                ? 'rounded-full bg-plum-700 px-4 py-1.5 text-sm text-cream-50'
                : 'rounded-full border border-sand-300 px-4 py-1.5 text-sm text-ink-700 hover:bg-cream-100'
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* ARTISAN LIST */}

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

        {visible.length === 0 ? (
          <p className="col-span-full border-t border-sand-300 py-6 text-ink-500">
            No artisans in this category yet.
          </p>
        ) : (
          visible.map((artisan) => (
            <ArtisanCard
              key={artisan.id}
              artisan={artisan}
            />
          ))
        )}

      </div>

    </div>
  )
}