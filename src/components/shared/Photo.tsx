type PhotoProps = {
  src: string
  alt: string
  className?: string
  fallback?: 'none' | 'placeholder'
}

export default function Photo({
  src,
  alt,
  className = '',
  fallback = 'placeholder',
}: PhotoProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`block object-cover ${className}`}
      onError={(event) => {
        if (fallback === 'none') {
          event.currentTarget.style.display = 'none'
        } else {
          event.currentTarget.src =
            'https://placehold.co/600x400?text=Image+Unavailable'
        }
      }}
    />
  )
}