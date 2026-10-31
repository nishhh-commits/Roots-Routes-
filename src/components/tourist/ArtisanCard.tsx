import Photo from '../shared/Photo'
import type { Artisan } from '../../types/artisan'

type Props = {
  artisan: Artisan
  onOpen: (artisan: Artisan) => void
}

export default function ArtisanCard({ artisan, onOpen }: Props) {
  return (
    <article className="grid gap-4 border-t border-sand-300 py-6 md:grid-cols-[14rem_1fr] md:gap-8">
      <div className="overflow-hidden rounded-md">
        <Photo
          src={`/images/artisans/${artisan.id}.jpg`}
          alt={`${artisan.craft} by ${artisan.name}`}
          className="h-44 w-full transition duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-xs uppercase tracking-wide text-sandstone-600">{artisan.category}</p>
        <h3 className="mt-1 text-2xl font-semibold text-plum-900">{artisan.craft}</h3>
        <p className="text-sm text-ink-500">{artisan.name} · {artisan.neighborhood}</p>
        <p className="mt-3 text-ink-700">{artisan.story}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-sm text-ink-700">
          <span>₹{artisan.workshopPrice} · {artisan.workshopDuration}</span>
          <button onClick={() => onOpen(artisan)} className="text-plum-700 underline">
            View profile
          </button>
          {artisan.isDemo && <span className="rounded bg-sand-200 px-2 py-0.5 text-xs">Demo data</span>}
        </div>
      </div>
    </article>
  )
}