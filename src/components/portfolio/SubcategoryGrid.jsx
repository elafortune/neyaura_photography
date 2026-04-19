import { Camera } from 'lucide-react'

export default function SubcategoryGrid({ subcategories, onSelect }) {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {subcategories.map((sub) => (
        <button
          key={sub.id}
          onClick={() => onSelect(sub.id)}
          className="group relative overflow-hidden aspect-[4/3] bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-blush"
          aria-label={`Voir ${sub.label}`}
        >
          {sub.cover ? (
            <img
              src={sub.cover}
              alt={sub.label}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-sand/80">
              <Camera size={32} className="text-taupe/40" />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent transition-opacity duration-300 group-hover:from-espresso/70" />

          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
            <span className="font-serif text-xl md:text-2xl text-cream leading-tight">
              {sub.label}
            </span>
            {sub.images?.length > 0 && (
              <span className="font-sans text-xs tracking-[0.15em] text-cream/60">
                {sub.images.length} photos
              </span>
            )}
          </div>

          {/* "À venir" badge si vide */}
          {(!sub.images || sub.images.length === 0) && (
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-espresso/60 backdrop-blur-sm">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-cream/70">
                À venir
              </span>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
