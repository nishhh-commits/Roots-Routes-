import Photo from '../shared/Photo'
import type { CommunityPlace } from '../../types/community'

export default function PlaceCard({ place }: { place: CommunityPlace }) {
  const src = place.image ?? `/images/places/${place.id}.jpg`

  return (
    <article className="grid gap-4 border-t border-sand-300 py-6 md:grid-cols-[14rem_1fr] md:gap-8">
      <div className="overflow-hidden rounded-md">
        <Photo src={src} alt={place.name} className="h-40 w-full transition duration-500 hover:scale-105" />
      </div>
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