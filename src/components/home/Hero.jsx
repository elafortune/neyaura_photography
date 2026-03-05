import { ChevronDown } from 'lucide-react';

const TITLE = 'NEYAURA';
const SUBTITLE = 'Photography';
const TAGLINE = "Capturer l'instant, sublimer l'émotion";

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
