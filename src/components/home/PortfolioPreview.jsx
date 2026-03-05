import { Link } from 'react-router-dom';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { categories } from '../../data/portfolioData';

export default function PortfolioPreview() {
  const ref = useScrollReveal();
  const gridRef = useScrollReveal(0.1);

  return (
    <section id="portfolio-preview" className="bg-cream py-20 md:py-28">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <SectionHeading title="Portfolio" subtitle="Mes univers" />

        <div ref={gridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/portfolio?category=${cat.id}`}
              className="group relative aspect-[4/5] overflow-hidden"
            >
              {/* Image */}
              <img
                src={cat.cover}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Permanent gradient + title */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end px-6 py-6">
                <span className="block font-serif text-2xl md:text-3xl tracking-[0.2em] text-cream">
                  {cat.label}
                </span>
                <span className="block font-sans text-xs tracking-[0.2em] uppercase text-cream/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Voir la galerie
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button to="/portfolio" variant="outline">
            Voir tout le portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
