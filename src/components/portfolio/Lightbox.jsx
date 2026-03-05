import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images, index, onClose, onNavigate }) {
  const total = images.length;

  const prev = useCallback(() => onNavigate((index - 1 + total) % total), [index, total, onNavigate]);
  const next = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      style={{ backgroundColor: 'rgba(26,20,18,0.96)' }}
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 font-sans text-xs tracking-[0.2em] text-cream/60">
        {index + 1} / {total}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-cream/70 hover:text-cream transition-colors z-10"
        aria-label="Fermer"
      >
        <X size={28} />
      </button>

      {/* Prev */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream transition-colors z-10 p-2"
        aria-label="Précédent"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Image */}
      <div className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <img
          key={index}
          src={images[index]}
          alt=""
          className="max-w-[90vw] max-h-[90vh] object-contain animate-scale-in"
        />
      </div>

      {/* Next */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream transition-colors z-10 p-2"
        aria-label="Suivant"
      >
        <ChevronRight size={36} />
      </button>
    </div>
  );
}
