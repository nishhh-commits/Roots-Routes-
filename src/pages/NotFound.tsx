import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-50 px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-leaf-700">
          Roots & Routes
        </p>

        <h1 className="mt-4 text-7xl font-bold text-plum-900">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-semibold text-plum-900">
          Page not found
        </h2>

        <p className="mt-3 text-sm text-ink-500">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-plum-700 px-6 py-3 text-white hover:bg-plum-900"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}