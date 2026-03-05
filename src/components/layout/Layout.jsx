import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { Instagram } from 'lucide-react';
import { socialLinks } from '../../data/portfolioData';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />

      {/* Floating Instagram bubble */}
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Poser une question sur Instagram"
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-3"
      >
        {/* Tooltip */}
        <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none bg-espresso text-cream font-sans text-xs tracking-wide px-3 py-2 rounded whitespace-nowrap shadow-lg">
          Poser une question
        </span>
        {/* Button */}
        <div className="w-13 h-13 flex items-center justify-center rounded-full bg-blush text-white shadow-lg hover:bg-blush-dark hover:scale-110 transition-all duration-300"
          style={{ width: '52px', height: '52px' }}>
          <Instagram size={22} />
        </div>
      </a>
    </>
  );
}
