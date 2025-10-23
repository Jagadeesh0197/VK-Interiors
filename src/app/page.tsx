import { SiteHeader } from '@/components/layout/header';
import { SiteFooter } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { ServicesSection } from '@/components/sections/services';
import { WhyUsSection } from '@/components/sections/why-us';
import { GallerySection } from '@/components/sections/gallery';
import { ContactSection } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyUsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
