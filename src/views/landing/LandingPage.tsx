import { Hero, FeaturesCards, IITBhilaiInfo, FaqSlider, ContactSection } from '@/components';
const LandingPage = () => {
  return (
    <div className="scroll-smooth">
      <Hero />
      <FeaturesCards />
      <IITBhilaiInfo />
      <FaqSlider />
      <ContactSection />
    </div>
  );
};

export default LandingPage;
