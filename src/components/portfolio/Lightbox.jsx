import { useEffect, useCallback, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ images, index, onClose, onNavigate }) {
  const total = images.length
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  const prev = useCallback(() => onNavigate((index - 1 + total) % total), [index, total, onNavigate])
  const next = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Swipe touch support (mobile)
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    // Only trigger if horizontal swipe is dominant
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx > 0 ? prev() : next()
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      style={{ backgroundColor: 'rgba(26,20,18,0.96)' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 font-sans text-xs tracking-[0.2em] text-cream/60 select-none z-10">
        {index + 1} / {total}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-cream/70 hover:text-cream transition-colors z-10 p-2 touch-manipulation"
        aria-label="Fermer"
      >
        <X size={28} />
      </button>

      {/* Prev — hidden on mobile (swipe instead) */}
      <button
        onClick={prev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream transition-colors z-10 p-3 hidden sm:block touch-manipulation"
        aria-label="Précédent"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Image */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-4 sm:px-16">
        <img
          key={index}
          src={images[index]}
          alt=""
          className="max-w-full max-h-[90vh] object-contain animate-scale-in select-none"
          draggable={false}
        />
      </div>

      {/* Next — hidden on mobile (swipe instead) */}
      <button
        onClick={next}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream transition-colors z-10 p-3 hidden sm:block touch-manipulation"
        aria-label="Suivant"
      >
        <ChevronRight size={36} />
      </button>

      {/* Mobile swipe hint — shown briefly */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:hidden font-sans text-xs text-cream/40 tracking-widest select-none">
        ← swipe →
      </div>
    </div>
  )
}
