const points = [
  { title: 'Meet the maker', text: 'Learn a craft from the person who practises it, not from a shop label.' },
  { title: 'Hear the story', text: 'Every craft carries a history, and the people who keep it going can tell it best.' },
  { title: 'Travel with purpose', text: 'In the full product, bookings would go straight to the artisan.' },
]

export default function WhyArtisans() {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-plum-900">Why discover local artisans?</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        {points.map((point) => (
          <div key={point.title} className="border-t border-sand-300 pt-3">
            <h3 className="text-lg font-semibold text-plum-900">{point.title}</h3>
            <p className="mt-1 text-sm text-ink-700">{point.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-500">Prototype: no payments or real bookings are processed.</p>
    </section>
  )
}