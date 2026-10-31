import type { Artisan } from '../../types/artisan'

export default function ArtisanCard({ artisan }: { artisan: Artisan }) {
  return (
    <article className="grid gap-2 border-t border-sand-300 py-6 md:grid-cols-[1fr_2fr_auto] md:gap-8">
      <div>
        <p className="text-xs uppercase tracking-wide text-sandstone-600">{artisan.category}</p>
        <h3 className="mt-1 text-xl font-semibold text-plum-900">{artisan.craft}</h3>
        <p className="text-sm text-ink-500">{artisan.name} · {artisan.neighborhood}</p>
      </div>
      <p className="text-ink-700">{artisan.story}</p>
      <div className="text-sm text-ink-700 md:text-right">
        <p>₹{artisan.workshopPrice} · {artisan.workshopDuration}</p>
        <p className="text-ink-500">{artisan.contact}</p>
        {artisan.isDemo && (
          <span className="mt-2 inline-block rounded bg-sand-200 px-2 py-0.5 text-xs text-ink-700">Demo data</span>
        )}
      </div>
    </article>
  )
}