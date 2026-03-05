import Hero from '../components/home/Hero';
import About from '../components/home/About';
import PortfolioPreview from '../components/home/PortfolioPreview';
import HomeFAQ from '../components/home/HomeFAQ';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <PortfolioPreview />
      <HomeFAQ />
    </>
  );
}
