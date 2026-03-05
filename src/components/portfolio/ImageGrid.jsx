import { useState, useRef, useEffect, useCallback } from 'react'
import Lightbox from './Lightbox'
import ProgressiveImg from '../ui/ProgressiveImg'

const BATCH = 12 // images chargées par lot au scroll

export default function ImageGrid({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [visibleCount, setVisibleCount] = useState(BATCH)
  const sentinelRef = useRef(null)

  // Reset quand la catégorie change
  useEffect(() => {
    setVisibleCount(BATCH)
    setLightboxIndex(null)
  }, [images])

  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + BATCH, images.length))
  }, [images.length])

  // Infinite scroll — charge le prochain lot quand le sentinel entre en vue
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore() },
      { rootMargin: '300px' }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore, visibleCount, images.length])

  const visible = images.slice(0, visibleCount)
  const hasMore = visibleCount < images.length

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 p-4 md:p-6 max-w-7xl mx-auto">
        {visible.map((src, i) => (
          <div
            key={src + i}
            className="category-enter break-inside-avoid group relative cursor-zoom-in"
            style={{
              animationDelay: `${Math.min(i % BATCH, 8) * 0.07}s`,
              opacity: 0,
              animationFillMode: 'forwards',
            }}
            onClick={() => setLightboxIndex(i)}
          >
            <ProgressiveImg
              src={src}
              alt=""
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* Hover tint */}
            <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/15 transition-colors duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Sentinel infinite scroll */}
      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-10">
          <div className="w-6 h-6 rounded-full border-2 border-sand border-t-blush animate-spin" />
        </div>
      )}

      {/* Compteur discret */}
      {!hasMore && images.length > BATCH && (
        <p className="text-center font-sans text-xs tracking-[0.2em] text-warm-gray pb-8">
          {images.length} photos
        </p>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
