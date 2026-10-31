import type { CommunityPlace } from '../../types/community'

export default function PlaceCard({ place }: { place: CommunityPlace }) {
  return (
    <article className="grid gap-4 border-t border-sand-300 py-6 md:grid-cols-[12rem_1fr]">
      {place.image ? (
        <img src={place.image} alt={place.name} className="h-32 w-full rounded-md object-cover md:w-48" />
      ) : (
        <div className="hidden h-32 w-48 rounded-md bg-cream-100 md:block" />
      )}
      <div>
        <p className="text-xs uppercase tracking-wide text-leaf-700">{place.category}</p>
        <h3 className="mt-1 text-xl font-semibold text-plum-900">{place.name}</h3>
        <p className="text-sm text-ink-500">{place.location}</p>
        <p className="mt-2 text-ink-700">{place.description}</p>
        {place.isDemo && (
          <span className="mt-2 inline-block rounded bg-sand-200 px-2 py-0.5 text-xs text-ink-700">Demo data</span>
        )}
      </div>
    </article>
  )
}