import { useState, useRef, useEffect } from 'react'

function buildSrcSet(src) {
  if (!src.startsWith('/photo_neyaura_webp/')) return null
  const base = src.slice(0, -'.webp'.length)
  return `${base}-400w.webp 400w, ${base}-800w.webp 800w, ${base}-1600w.webp 1600w`
}

export default function ProgressiveImg({ src, alt = '', className = '', style, onClick }) {
  const [status, setStatus] = useState('loading') // 'loading' | 'loaded' | 'error'
  const imgRef = useRef(null)

  useEffect(() => {
    setStatus('loading')
    const img = imgRef.current
    if (!img) return
    // Already cached / loaded synchronously
    if (img.complete && img.naturalWidth > 0) {
      setStatus('loaded')
      return
    }
    const onLoad  = () => setStatus('loaded')
    const onError = () => setStatus('error')
    img.addEventListener('load', onLoad)
    img.addEventListener('error', onError)
    return () => {
      img.removeEventListener('load', onLoad)
      img.removeEventListener('error', onError)
    }
  }, [src])

  return (
    <div className="relative overflow-hidden bg-sand">
      {/* Skeleton shimmer */}
      {status === 'loading' && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: 'linear-gradient(90deg, #EDE8E0 25%, #FAF7F2 50%, #EDE8E0 75%)' }}
        />
      )}
      <img
        ref={imgRef}
        src={src}
        srcSet={buildSrcSet(src) || undefined}
        sizes={buildSrcSet(src) ? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' : undefined}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`transition-opacity duration-500 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'} ${className}`}
        style={style}
        onClick={onClick}
      />
    </div>
  )
}
