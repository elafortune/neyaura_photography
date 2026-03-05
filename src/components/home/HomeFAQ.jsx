import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../../hooks/useScrollReveal';
import SectionHeading from '../ui/SectionHeading';

const faqGroups = [
  {
    title: 'Réservation & Tarifs',
    questions: [
      {
        q: 'Comment réserver une séance photo ?',
        a: "La réservation se fait via le formulaire de contact ou en message direct sur Instagram. Après échange sur votre projet, je vous envoie un devis personnalisé. La séance est confirmée à réception d'un acompte de 30 %.",
      },
      {
        q: 'Quels sont vos tarifs ?',
        a: "Les tarifs varient selon le type de prestation, la durée et les déplacements éventuels. Un devis sur-mesure vous est envoyé après discussion de votre projet.",
      },
      {
        q: 'Faut-il verser un acompte ?',
        a: "Oui, un acompte de 30 % est demandé à la confirmation. Il permet de bloquer la date dans mon agenda et est déduit du montant total.",
      },
      {
        q: "Puis-je annuler ou reporter ma séance ?",
        a: "Tout report doit être signalé au moins 72 h avant la séance. En cas d'annulation moins de 48 h avant, l'acompte reste acquis.",
      },
    ],
  },
  {
    title: 'Le jour J & La livraison',
    questions: [
      {
        q: 'Combien de temps dure une séance ?',
        a: "Comptez 1 h à 2 h pour un portrait ou shooting mode, une demi-journée à une journée complète pour un mariage, et 2 h à 4 h pour un événement.",
      },
      {
        q: 'Combien de photos vais-je recevoir ?',
        a: "En moyenne : 30 à 80 retouches pour un portrait, 200 à 400 pour un mariage, 50 à 150 pour un événement. Toutes les photos sont sélectionnées et retouchées avec soin.",
      },
      {
        q: 'Sous quel délai recevrai-je mes photos ?',
        a: "Les photos sont livrées sous 2 à 4 semaines. Pour les mariages, comptez 4 à 6 semaines. Vous recevrez une galerie privée en ligne en haute résolution.",
      },
      {
        q: 'Dans quel format sont livrées les photos ?',
        a: "Les photos sont livrées en JPEG haute résolution via une galerie privée sécurisée. Vous pouvez les télécharger et les imprimer librement pour un usage personnel.",
      },
    ],
  },
  {
    title: 'Droits & Aspects légaux',
    questions: [
      {
        q: 'Puis-je utiliser mes photos sur les réseaux sociaux ?',
        a: "Oui ! Les photos livrées peuvent être utilisées librement à titre personnel et sur les réseaux sociaux. Merci de mentionner @neyaura_photography lorsque c'est possible. Pour un usage commercial, contactez-moi.",
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

export default function HomeFAQ() {
  const refG1 = useScrollReveal(0.1);
  const refG2 = useScrollReveal(0.1);
  const refG3 = useScrollReveal(0.1);
  const refCTA = useScrollReveal(0.2);
  const groupRefs = [refG1, refG2, refG3];

  return (
    <section id="faq" className="bg-ivory py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading title="FAQ" subtitle="Questions fréquentes" />

        <div className="mt-12 space-y-14">
          {faqGroups.map((group, gi) => (
            <div key={group.title} ref={groupRefs[gi]} className="reveal">
              <h3 className="font-serif text-lg md:text-xl font-light tracking-[0.15em] text-charcoal mb-4 pb-3 border-b border-blush/30">
                {group.title}
              </h3>
              {group.questions.map((item) => (
                <FAQItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          ))}
        </div>

        <div ref={refCTA} className="reveal text-center mt-16">
          <p className="font-serif text-lg italic text-taupe mb-6">
            Vous avez d&apos;autres questions ?
          </p>
          <Link
            to="/faq"
            className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-espresso text-espresso px-8 py-3 hover:bg-espresso hover:text-cream transition-colors duration-300"
          >
            Voir toutes les questions
          </Link>
        </div>
      </div>
    </section>
  );
}
