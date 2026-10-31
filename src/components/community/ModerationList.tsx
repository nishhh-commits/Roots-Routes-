import type { CommunityPlace, PlaceStatus } from '../../types/community'
import PlaceCard from './PlaceCard'

type Props = {
  places: CommunityPlace[]
  onDecide: (id: string, status: PlaceStatus) => void
}

export default function ModerationList({ places, onDecide }: Props) {
  const pending = places.filter((place) => place.status === 'pending')
  const approved = places.filter((place) => place.status === 'approved').length
  const rejected = places.filter((place) => place.status === 'rejected').length

  return (
    <div>
      <p className="text-sm text-ink-500">
        {pending.length} pending · {approved} approved · {rejected} rejected
      </p>
      {pending.length === 0 ? (
        <p className="mt-6 border-t border-sand-300 py-6 text-ink-500">No places are waiting for verification.</p>
      ) : (
        pending.map((place) => (
          <div key={place.id}>
            <PlaceCard place={place} />
            <div className="flex items-center gap-2 pb-6">
              <span className="rounded bg-plum-100 px-2 py-0.5 text-xs text-plum-700">Pending Verification</span>
              <button
                onClick={() => onDecide(place.id, 'approved')}
                className="rounded-md bg-leaf-700 px-4 py-1.5 text-sm text-cream-50 hover:bg-leaf-500"
              >
                Approve
              </button>
              <button
                onClick={() => onDecide(place.id, 'rejected')}
                className="rounded-md border border-sand-300 px-4 py-1.5 text-sm text-ink-700 hover:bg-cream-100"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}