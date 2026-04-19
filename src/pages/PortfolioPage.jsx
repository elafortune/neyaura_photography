import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import CategoryTabs from '../components/portfolio/CategoryTabs';
import SubcategoryGrid from '../components/portfolio/SubcategoryGrid';
import ImageGrid from '../components/portfolio/ImageGrid';
import { categories } from '../data/portfolioData';

export default function PortfolioPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || categories[0].id;
  const initialSub = searchParams.get('sub') || null;

  const [active, setActive] = useState(initialCategory);
  const [activeSub, setActiveSub] = useState(initialSub);

  // Sync URL → state
  useEffect(() => {
    const cat = searchParams.get('category');
    const sub = searchParams.get('sub');
    if (cat && categories.some((c) => c.id === cat)) {
      setActive(cat);
      setActiveSub(sub || null);
    }
  }, [searchParams]);

  const handleCategoryChange = (id) => {
    setActive(id);
    setActiveSub(null);
    setSearchParams({ category: id });
  };

  const handleSubSelect = (subId) => {
    setActiveSub(subId);
    setSearchParams({ category: active, sub: subId });
  };

  const handleBackToSubs = () => {
    setActiveSub(null);
    setSearchParams({ category: active });
  };

  const current = categories.find((c) => c.id === active) || categories[0];
  const hasSubs = !!current.subcategories;
  const currentSub = hasSubs && activeSub
    ? current.subcategories.find((s) => s.id === activeSub)
    : null;

  // Titre affiché dans le mini hero
  const heroLabel = currentSub
    ? `${current.label} — ${currentSub.label}`
    : current.label;

  // Images et label pour la grille
  const gridImages = currentSub ? currentSub.images : (!hasSubs ? current.images : []);
  const gridLabel  = currentSub ? currentSub.label : current.label;

  const showSubGrid  = hasSubs && !activeSub;
  const showImgGrid  = (!hasSubs) || (hasSubs && activeSub);

  return (
    <>
      {/* Mini Hero */}
      <section className="h-[40vh] flex items-center justify-center bg-cream pt-16 md:pt-20">
        <div className="text-center animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] text-charcoal">
            Portfolio
          </h1>
          <p className="mt-3 font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-taupe">
            {heroLabel}
          </p>
        </div>
      </section>

      <CategoryTabs active={active} onChange={handleCategoryChange} />

      {/* Bouton retour sous-catégories */}
      {hasSubs && activeSub && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6">
          <button
            onClick={handleBackToSubs}
            className="flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-taupe hover:text-blush transition-colors"
          >
            <ChevronLeft size={16} />
            {current.label}
          </button>
        </div>
      )}

      <section key={`${active}-${activeSub ?? 'subs'}`} className="bg-cream py-4 min-h-[60vh]">
        {showSubGrid && (
          <SubcategoryGrid
            subcategories={current.subcategories}
            onSelect={handleSubSelect}
          />
        )}

        {showImgGrid && (
          <ImageGrid
            images={gridImages}
            categoryLabel={gridLabel}
          />
        )}
      </section>
    </>
  );
}
