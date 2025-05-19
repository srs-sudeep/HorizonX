import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { TechStack } from '@/components/landing/TechStack';
import { CaseStudies } from '@/components/landing/CaseStudies';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { OpenSource } from '@/components/landing/OpenSource';
import { CallToAction } from '@/components/landing/CallToAction';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <Hero />
        <Features />
        <TechStack />
        <CaseStudies />
        <Testimonials />
        <Pricing />
        <OpenSource />
        <CallToAction />
      </main>
    </div>
  );
};

export default LandingPage;
