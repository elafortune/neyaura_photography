import { useState, useRef, useEffect } from 'react'

/**
 * ProgressiveImg — affiche un skeleton animé pendant le chargement,
 * puis fait un fade-in de l'image. Compatible lazy loading natif.
 */
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
