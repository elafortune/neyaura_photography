import useScrollReveal from '../../hooks/useScrollReveal';

export default function CtaSection() {
  const ref = useScrollReveal();

  return (
    <section className="relative bg-espresso overflow-hidden py-24 md:py-32">
      {/* Texture subtile — lignes diagonales */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #FAF7F2 0, #FAF7F2 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
        }}
      />

      <div ref={ref} className="reveal relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Ornement */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="w-12 h-px bg-cream/20" />
          <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-cream/30">
            Parlons de votre projet
          </span>
          <span className="w-12 h-px bg-cream/20" />
        </div>

        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.1em] text-cream leading-snug">
          Votre histoire mérite
          <br />
          <span className="italic text-blush/80">d'être immortalisée</span>
        </h2>

        <p className="mt-5 font-sans text-sm tracking-wide text-cream/45 leading-relaxed">
          Chaque séance est unique — réservons un moment pour en parler.
        </p>

        <a
          href="https://www.instagram.com/neyaura_photography?igsh=cnU1Y2VsdTY4ZTUw&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 font-sans text-[11px] tracking-[0.3em] uppercase px-10 py-4 border border-cream/30 text-cream/75 transition-all duration-300 hover:border-blush hover:text-blush hover:tracking-[0.35em]"
        >
          Me contacter
        </a>
      </div>
    </section>
  );
}
