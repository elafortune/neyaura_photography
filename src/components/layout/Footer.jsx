import { Instagram, Mail } from 'lucide-react';
import TikTokIcon from '../ui/TikTokIcon';
import { socialLinks } from '../../data/portfolioData';

export default function Footer() {
  return (
    <footer className="bg-espresso text-warm-gray">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col items-center gap-6">
          <span className="font-serif text-2xl md:text-3xl tracking-[0.3em] text-cream">
            NEYAURA
          </span>

          <div className="flex items-center gap-6">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blush transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blush transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a
              href="mailto:neyauraphotohraphy@gmail.com"
              className="hover:text-blush transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

          <div className="w-12 h-px bg-warm-gray/30" />

          <p className="text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Neyaura Photography
          </p>
        </div>
      </div>
    </footer>
  );
}
