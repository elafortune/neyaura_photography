import { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionHeading from '../ui/SectionHeading';
import { prestations } from '../../data/portfolioData';

export default function ContactForm() {
  const ref = useScrollReveal();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass =
    'w-full bg-transparent border-b border-sand focus:border-blush outline-none py-3 font-sans text-sm text-espresso placeholder:text-warm-gray transition-colors';

  return (
    <section id="contact" className="bg-ivory py-20 md:py-28">
      <div ref={ref} className="reveal max-w-2xl mx-auto px-6">
        <SectionHeading title="Contact" subtitle="Parlons de votre projet" />

        <div className="text-center mb-8">
          <a
            href="mailto:neyauraphotohraphy@gmail.com"
            className="font-sans text-sm text-espresso/70 hover:text-blush transition-colors tracking-wide"
          >
            neyauraphotohraphy@gmail.com
          </a>
        </div>

        {sent ? (
          <div className="text-center py-12 animate-fade-in">
            <p className="font-serif text-2xl text-charcoal">Merci pour votre message !</p>
            <p className="mt-3 font-sans text-sm text-taupe">
              Je vous répondrai dans les plus brefs délais.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 mt-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                required
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                required
                className={inputClass}
              />
            </div>

            <select
              name="prestation"
              required
              defaultValue=""
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" disabled>
                Type de prestation
              </option>
              {prestations.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              placeholder="Votre message"
              rows={4}
              required
              className={`${inputClass} resize-none`}
            />

            <div className="text-center">
              <button
                type="submit"
                className="inline-block font-sans text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-300 px-8 py-3 bg-blush text-white hover:bg-blush-dark"
              >
                Envoyer
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
