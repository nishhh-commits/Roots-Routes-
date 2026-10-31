import type { CommunityPlace } from "../../types/community";

interface PlaceCardProps {
  place: CommunityPlace;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <article className="border-b border-sand-300 py-5">

      <p className="text-xs uppercase tracking-wide text-leaf-700">
        {place.category}
      </p>

      <h3 className="text-xl font-semibold text-plum-900">
        {place.name}
      </h3>

      <p className="text-sm text-ink-700">
        {place.location}
      </p>

      <p className="mt-2 text-sm text-ink-700">
        {place.description}
      </p>

      {place.isDemo && (
        <span className="mt-2 inline-block rounded bg-sand-200 px-2 py-0.5 text-xs text-ink-700">
          Demo data
        </span>
      )}

    </article>
  );
}