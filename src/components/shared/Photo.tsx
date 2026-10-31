import { useState } from 'react'

type PhotoProps = {
  src: string
  alt: string
  className?: string
  fallback?: 'none' | 'placeholder' | 'block'
}

export default function Photo({
  src,
  alt,
  className = '',
  fallback = 'placeholder',
}: PhotoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    if (fallback === 'none') {
      return null
    }

    return (
      <div
        role="img"
        aria-label={alt || 'Image unavailable'}
        className={`flex items-center justify-center bg-sand-200 text-ink-700 ${className}`}
      >
        Image unavailable
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`block object-cover ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}