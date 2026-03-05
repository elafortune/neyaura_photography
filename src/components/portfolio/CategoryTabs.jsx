import { categories } from '../../data/portfolioData';

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="sticky top-16 md:top-20 z-40 bg-cream/95 backdrop-blur-md border-b border-sand">
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1 py-3 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`font-sans text-xs tracking-[0.15em] uppercase px-4 py-2 transition-all duration-300 whitespace-nowrap ${
                active === cat.id
                  ? 'text-blush border-b-2 border-blush'
                  : 'text-taupe hover:text-charcoal'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
