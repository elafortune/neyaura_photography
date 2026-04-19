import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const TITLE = 'NEYAURA';
const SUBTITLE = 'Photography';
const TAGLINE = "Capturer l'instant, sublimer l'émotion";

// Délai après la fin des animations de lettres (~2.4s)
const CTA_DELAY = '2.5s';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image — fetchpriority=high car c'est le LCP */}
      <img
        src="/photo_neyaura_webp/niva/photo_accueil.webp"
        alt=""
        aria-hidden="true"
        fetchpriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Light overlay so text stays readable */}
      <div className="absolute inset-0 bg-cream/70" />

      {/* Content */}
      <div className="relative text-center">
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.3em] text-espresso">
          {TITLE.split('').map((letter, i) => (
            <span
              key={i}
              className="hero-letter"
              style={{ animationDelay: `${0.05 + i * 0.08}s` }}
            >
              {letter}
            </span>
          ))}
        </h1>

        <p className="mt-2 font-sans text-sm md:text-base tracking-[0.5em] uppercase text-espresso/70">
          {SUBTITLE.split('').map((letter, i) => (
            <span
              key={i}
              className="hero-letter"
              style={{ animationDelay: `${0.05 + TITLE.length * 0.08 + 0.15 + i * 0.05}s` }}
            >
              {letter}
            </span>
          ))}
        </p>

        <p className="mt-6 font-serif text-lg md:text-xl italic text-espresso/60 font-light">
          {TAGLINE.split('').map((char, i) => (
            <span
              key={i}
              className="hero-letter"
              style={{
                animationDelay: `${
                  0.05 + TITLE.length * 0.08 + 0.15 + SUBTITLE.length * 0.05 + 0.2 + i * 0.025
                }s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>

        {/* Séparateur décoratif */}
        <div
          className="mt-10 flex items-center justify-center gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: CTA_DELAY, animationFillMode: 'forwards' }}
        >
          <span className="w-10 h-px bg-espresso/25" />
          <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-espresso/35">
            Neyaura Photography
          </span>
          <span className="w-10 h-px bg-espresso/25" />
        </div>

        {/* Boutons CTA */}
        <div
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 opacity-0 animate-fade-in"
          style={{ animationDelay: CTA_DELAY, animationFillMode: 'forwards' }}
        >
          <Link
            to="/portfolio"
            className="font-sans text-[11px] tracking-[0.25em] uppercase px-9 py-3.5 bg-blush text-white transition-all duration-300 hover:bg-blush/85 hover:tracking-[0.3em]"
          >
            Voir le portfolio
          </Link>
          <a
            href="https://www.instagram.com/neyaura_photography?igsh=cnU1Y2VsdTY4ZTUw&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] tracking-[0.25em] uppercase px-9 py-3.5 border border-espresso/35 text-espresso/80 transition-all duration-300 hover:border-blush hover:text-blush hover:tracking-[0.3em]"
          >
            Me contacter
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 animate-bounce text-warm-gray hover:text-blush transition-colors"
        aria-label="Défiler vers le bas"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
