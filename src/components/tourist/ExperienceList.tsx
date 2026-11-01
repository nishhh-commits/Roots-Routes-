import { experiences } from '../../data/experience'

export default function ExperienceList() {
  return (
    <div className="space-y-4">
      {experiences.map((item) => (
        <article
          key={item.id}
          className="grid gap-4 border-t border-sand-300 py-5 md:grid-cols-[1fr_auto]"
        >
          <div>
            <p className="text-xs uppercase tracking-wide text-leaf-700">
              {item.kind}
            </p>

            <h3 className="mt-1 text-xl font-semibold text-plum-900">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-ink-700">
              {item.description}
            </p>
          </div>

          <div className="text-sm text-ink-700 md:text-right">
            <p>{item.duration}</p>

            <p className="mt-2 font-semibold text-plum-900">
              ₹{item.price} per person
            </p>

            {item.isDemo && (
              <span className="mt-2 inline-block rounded bg-sand-200 px-2 py-1 text-xs">
                Demo experience
              </span>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}