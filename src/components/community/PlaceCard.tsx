import type { CommunityPlace } from '../../types/community'

interface PlaceCardProps {
  place: CommunityPlace
}

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <article className="grid gap-4 border-t border-sand-300 py-6 md:grid-cols-[12rem_1fr]">

      {place.image ? (
        <img
          src={place.image}
          alt={place.name}
className="h-40 w-full rounded-lg object-cover md:w-48"
        />
      ) : (
        <div className="flex h-40 w-full items-center justify-center rounded-lg bg-cream-100 text-sm text-ink-500 md:w-48">
          No image available
        </div>
      )}

      <div>
        <p className="text-xs uppercase tracking-wide text-leaf-700">
          {place.category}
        </p>

        <h3 className="mt-1 text-xl font-semibold text-plum-900">
          {place.name}
        </h3>

        <p className="text-sm text-ink-500">
          {place.location}
        </p>

        <p className="mt-2 text-ink-700">
          {place.description}
        </p>

        {place.isDemo && (
          <span className="mt-2 inline-block rounded bg-sand-200 px-2 py-1 text-xs text-ink-700">
            Demo data
          </span>
        )}
      </div>
    </article>
  )
}