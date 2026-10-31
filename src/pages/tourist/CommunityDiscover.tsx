import { communityPlaces } from '../../data/community'
import PlaceCard from '../../components/community/PlaceCard'

export default function CommunityDiscover() {
  const approved = communityPlaces.filter((place) => place.status === 'approved')

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-leaf-700">Community Discover</p>
      <h1 className="mt-2 text-4xl font-semibold text-plum-900">Hidden places, verified by locals</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Only places approved by a moderator appear here. Entries shown are prototype data.
      </p>
      <div className="mt-8">
        {approved.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  )
}