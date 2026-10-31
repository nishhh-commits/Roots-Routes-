import { useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  fallback?: 'block' | 'none'
}

export default function Photo({ src, alt, className = '', fallback = 'block' }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return fallback === 'block' ? <div aria-hidden="true" className={`bg-sand-200 ${className}`} /> : null
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}