import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryTabs from '../components/portfolio/CategoryTabs';
import ImageGrid from '../components/portfolio/ImageGrid';
import { categories } from '../data/portfolioData';

export default function PortfolioPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || categories[0].id;
  const [active, setActive] = useState(initialCategory);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.some((c) => c.id === cat)) {
      setActive(cat);
    }
  }, [searchParams]);

  const handleChange = (id) => {
    setActive(id);
    setSearchParams({ category: id });
  };

  const current = categories.find((c) => c.id === active) || categories[0];

  return (
    <>
      {/* Mini Hero */}
      <section className="h-[40vh] flex items-center justify-center bg-cream pt-16 md:pt-20">
        <div className="text-center animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] text-charcoal">
            Portfolio
          </h1>
          <p className="mt-3 font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-taupe">
            {current.label}
          </p>
        </div>
      </section>

      <CategoryTabs active={active} onChange={handleChange} />

      <section key={active} className="bg-cream py-8 min-h-[60vh]">
        <ImageGrid images={current.images} />
      </section>
    </>
  );
}
