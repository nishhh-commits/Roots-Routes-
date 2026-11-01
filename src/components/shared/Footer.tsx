import { resetDemo } from '../../utils/demo'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-sand-200 bg-cream-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-plum-900">Roots & Routes</p>
          <p className="text-sm text-ink-500">Discover Hidden Gems. Connect with Culture. Travel with Purpose.</p>
        </div>
        <div className="text-sm text-ink-500 md:text-right">
          <p>Udaipur pilot prototype by Team MUSAFIR. Sample data is labelled in the app.</p>
          <button onClick={resetDemo} className="mt-1 underline hover:text-ink-900">
            Reset demo data
          </button>
        </div>
      </div>
    </footer>
  )
}