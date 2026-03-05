import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Mail, Menu, X } from 'lucide-react';
import TikTokIcon from '../ui/TikTokIcon';
import { socialLinks } from '../../data/portfolioData';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navBg = scrolled || open ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent';

  const linkClass = (path) =>
    `font-sans text-xs tracking-[0.2em] uppercase transition-colors border-b pb-0.5 ${
      pathname === path
        ? 'border-blush text-blush'
        : 'border-transparent text-espresso hover:text-blush'
    }`;

  const mobileLinkClass = (path) =>
    `font-sans text-sm tracking-[0.2em] uppercase transition-colors border-b pb-0.5 ${
      pathname === path
        ? 'border-blush text-blush'
        : 'border-transparent text-espresso hover:text-blush'
    }`;

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-xl md:text-2xl tracking-[0.3em] text-charcoal hover:text-blush transition-colors"
        >
          NEYAURA PHOTOGRAPHY
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkClass('/')}>
            Accueil
          </Link>
          <a
            href="/#about"
            className="font-sans text-xs tracking-[0.2em] uppercase border-b border-transparent pb-0.5 text-espresso hover:text-blush transition-colors"
          >
            À propos
          </a>
          <Link to="/portfolio" className={linkClass('/portfolio')}>
            Portfolio
          </Link>
          <Link to="/faq" className={linkClass('/faq')}>
            FAQ
          </Link>

          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-sand">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-espresso hover:text-blush transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-espresso hover:text-blush transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-[18px] h-[18px]" />
            </a>
            <a
              href="mailto:neyauraphotohraphy@gmail.com"
              className="text-espresso hover:text-blush transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-charcoal"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream/95 backdrop-blur-md border-t border-sand animate-fade-in-down">
          <div className="flex flex-col items-center gap-6 py-8">
            <Link to="/" className={mobileLinkClass('/')}>
              Accueil
            </Link>
            <a
              href="/#about"
              className="font-sans text-sm tracking-[0.2em] uppercase border-b border-transparent pb-0.5 text-espresso hover:text-blush transition-colors"
            >
              À propos
            </a>
            <Link to="/portfolio" className={mobileLinkClass('/portfolio')}>
              Portfolio
            </Link>
            <Link to="/faq" className={mobileLinkClass('/faq')}>
              FAQ
            </Link>

            <div className="flex items-center gap-6 pt-2">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-espresso hover:text-blush transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-espresso hover:text-blush transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:neyauraphotohraphy@gmail.com"
                className="text-espresso hover:text-blush transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
