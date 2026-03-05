import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { socialLinks } from '../data/portfolioData';

const faqGroups = [
  {
    title: 'Réservation & Tarifs',
    questions: [
      {
        q: 'Comment réserver une séance photo ?',
        a: "La réservation se fait simplement via le formulaire de contact ou en message direct sur Instagram. Après échange sur votre projet, je vous envoie un devis personnalisé. La séance est confirmée à réception d'un acompte de 30 %.",
      },
      {
        q: 'Quels sont vos tarifs ?',
        a: "Les tarifs varient selon le type de prestation, la durée et les déplacements éventuels. Un devis sur-mesure vous est envoyé après discussion de votre projet. N'hésitez pas à me contacter pour plus d'informations.",
      },
      {
        q: 'Faut-il verser un acompte ?',
        a: "Oui, un acompte de 30 % est demandé à la confirmation de la réservation. Il permet de bloquer la date dans mon agenda et est déduit du montant total.",
      },
      {
        q: "Puis-je annuler ou reporter ma séance ?",
        a: "Tout report doit être signalé au moins 72 h avant la séance. En cas d'annulation moins de 48 h avant, l'acompte reste acquis. Pour les mariages, les conditions spécifiques sont précisées dans le contrat.",
      },
    ],
  },
  {
    title: 'Le jour J & La livraison',
    questions: [
      {
        q: 'Combien de temps dure une séance ?',
        a: "La durée dépend de la prestation : comptez 1 h à 2 h pour un portrait ou shooting mode, une demi-journée à une journée complète pour un mariage, et 2 h à 4 h pour un événement.",
      },
      {
        q: 'Combien de photos vais-je recevoir ?',
        a: "Le nombre de photos livrées dépend du type de séance. En moyenne : 30 à 80 retouches pour un portrait, 200 à 400 pour un mariage, 50 à 150 pour un événement. Toutes les photos sont sélectionnées et retouchées avec soin.",
      },
      {
        q: 'Sous quel délai recevrai-je mes photos ?',
        a: "Les photos sont livrées sous 2 à 4 semaines selon la charge de travail. Pour les mariages, comptez 4 à 6 semaines. Vous recevrez une galerie privée en ligne pour les télécharger en haute résolution.",
      },
      {
        q: 'Dans quel format sont livrées les photos ?',
        a: "Les photos sont livrées en JPEG haute résolution, via une galerie privée en ligne sécurisée. Vous pouvez les télécharger et les imprimer librement pour un usage personnel.",
      },
    ],
  },
  {
    title: 'Droits & Aspects légaux',
    questions: [
      {
        q: 'Puis-je utiliser mes photos sur les réseaux sociaux ?',
        a: "Oui ! Les photos livrées peuvent être utilisées librement pour un usage personnel et sur les réseaux sociaux. Je vous demande simplement de mentionner @neyaura_photography lorsque cela est possible. Pour un usage commercial, une licence spécifique est nécessaire — contactez-moi pour en discuter.",
      },
    ],
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-sand last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="font-sans text-sm md:text-base tracking-wide text-espresso">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-blush transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`faq-body ${open ? 'open' : ''}`}>
        <div>
          <p className="font-sans text-sm leading-relaxed text-espresso/70 pb-5 pr-8">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const refGroup1 = useScrollReveal(0.15);
  const refGroup2 = useScrollReveal(0.15);
  const refGroup3 = useScrollReveal(0.15);
  const refCTA = useScrollReveal(0.2);
  const groupRefs = [refGroup1, refGroup2, refGroup3];

  return (
    <>
      {/* Mini hero */}
      <section className="h-[40vh] flex items-center justify-center bg-cream pt-16 md:pt-20">
        <div className="text-center animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] text-charcoal">
            FAQ
          </h1>
          <p className="mt-3 font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-taupe">
            Questions fréquentes
          </p>
        </div>
      </section>

      {/* FAQ groups */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 space-y-16">
          {faqGroups.map((group, gi) => (
            <div key={group.title} ref={groupRefs[gi]} className="reveal">
              <h2 className="font-serif text-xl md:text-2xl font-light tracking-[0.15em] text-charcoal mb-6 pb-3 border-b border-blush/30">
                {group.title}
              </h2>
              <div>
                {group.questions.map((item) => (
                  <FAQItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ivory py-16 md:py-20">
        <div ref={refCTA} className="reveal text-center max-w-xl mx-auto px-6">
          <p className="font-serif text-2xl md:text-3xl italic text-charcoal font-light mb-3">
            Vous avez d&apos;autres questions ?
          </p>
          <p className="font-sans text-sm text-espresso/70 mb-8">
            N&apos;hésitez pas à me contacter directement sur Instagram — je réponds généralement sous 24 h.
          </p>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-espresso text-espresso px-8 py-3 hover:bg-espresso hover:text-cream transition-colors duration-300"
          >
            Me contacter sur Instagram
          </a>
        </div>
      </section>
    </>
  );
}
