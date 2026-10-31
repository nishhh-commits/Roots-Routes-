import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Artisan } from '../../types/artisan'
import Photo from '../shared/Photo'


type Props = {
  artisan: Artisan | null
  onClose: () => void
}

export default function ArtisanModal({ artisan, onClose }: Props) {
  useEffect(() => {
    if (!artisan) {
      return
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [artisan, onClose])

  return (
    <AnimatePresence>
      {artisan && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-20 flex items-end justify-center bg-ink-900/50 md:items-center md:p-6"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={artisan.craft}
            className="w-full max-w-lg rounded-t-xl bg-cream-50 p-6 md:rounded-xl"
          >
            <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
              <Photo
                src={`/images/artisans/${artisan.id}.jpg`}
                alt={artisan.craft}
                fallback="none"
                className="h-40 w-full"
              />
            </div>
            <p className="text-xs uppercase tracking-wide text-sandstone-600">{artisan.category}</p>
            <h2 className="mt-1 text-2xl font-semibold text-plum-900">{artisan.craft}</h2>
            <p className="text-sm text-ink-500">{artisan.name} · {artisan.neighborhood}</p>
            <p className="mt-4 text-ink-700">{artisan.story}</p>
            <div className="mt-4 border-y border-sand-300 py-3 text-sm text-ink-700">
              <p>Workshop: {artisan.workshopDuration} · ₹{artisan.workshopPrice} per person</p>
              <p className="mt-1">Contact: {artisan.contact}</p>
              {artisan.isDemo && <p className="mt-1 text-ink-500">Demo profile: contact details are placeholders.</p>}
            </div>
            <div className="mt-5 flex gap-3">
              <a
                href={`mailto:${artisan.contact}?subject=${encodeURIComponent(`Workshop request: ${artisan.craft}`)}`}
                className="rounded-md bg-plum-700 px-5 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-plum-900"
              >
                Request a booking
              </a>
              <button
                onClick={onClose}
                className="rounded-md border border-sand-300 px-5 py-2.5 text-sm text-ink-700 hover:bg-cream-100"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}