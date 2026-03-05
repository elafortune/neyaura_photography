import useScrollReveal from '../../hooks/useScrollReveal';
import SectionHeading from '../ui/SectionHeading';

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="bg-ivory py-20 md:py-28">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <SectionHeading title="À propos" subtitle="Mon histoire" />

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mt-8">
          {/* Portrait */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="/photo_neyaura_webp/niva/photo_a_propos.webp"
                alt="Neyaura - Photographe"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-blush/30" />
          </div>

          {/* Text */}
          <div className="space-y-5">
            <p className="font-sans text-sm md:text-base leading-relaxed text-espresso/80">
              Passionnée par l&apos;image depuis toujours, je capture les moments qui comptent
              avec sensibilité et authenticité. Chaque séance est une rencontre, chaque
              photo une histoire unique.
            </p>
            <p className="font-sans text-sm md:text-base leading-relaxed text-espresso/80">
              Spécialisée en mariage, mode et portrait professionnel, je m&apos;adapte à
              votre univers pour créer des images qui vous ressemblent. Mon approche mêle
              lumière naturelle, compositions épurées et une touche d&apos;émotion.
            </p>
            <p className="font-sans text-sm md:text-base leading-relaxed text-espresso/80">
              Basée en région parisienne, je me déplace partout en France et à
              l&apos;international pour vos projets.
            </p>
            <p className="font-serif text-2xl italic text-blush mt-6">
              — Neyaura
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
