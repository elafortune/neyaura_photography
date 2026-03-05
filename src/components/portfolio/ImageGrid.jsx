import { useState } from 'react';
import Lightbox from './Lightbox';

export default function ImageGrid({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 p-6 max-w-7xl mx-auto">
        {images.map((src, i) => (
          <div
            key={src + i}
            className="category-enter break-inside-avoid overflow-hidden group relative cursor-zoom-in"
            style={{
              animationDelay: `${Math.min(i, 8) * 0.07}s`,
              opacity: 0,
              animationFillMode: 'forwards',
            }}
            onClick={() => setLightboxIndex(i)}
          >
            <img
              src={src}
              alt=""
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
            {/* Hover tint */}
            <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/15 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
