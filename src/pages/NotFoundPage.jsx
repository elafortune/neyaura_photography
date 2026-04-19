import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="font-sans text-xs tracking-[0.4em] uppercase text-taupe mb-6">404</p>
      <h1 className="font-serif text-4xl md:text-5xl font-light tracking-[0.2em] text-charcoal mb-4">
        Page introuvable
      </h1>
      <p className="font-sans text-sm text-taupe max-w-xs leading-relaxed mb-10">
        Cette page n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="font-sans text-xs tracking-[0.2em] uppercase px-8 py-3 bg-blush text-white transition-opacity hover:opacity-80"
      >
        Retour à l'accueil
      </Link>
    </section>
  );
}
