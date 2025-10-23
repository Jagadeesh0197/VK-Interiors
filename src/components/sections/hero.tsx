import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ImageTransition } from '@/components/image-transition';
import { PlaceHolderImages } from '@/lib/placeholder-images';


export function HeroSection() {
  const heroImages = PlaceHolderImages.filter(p => p.id.startsWith('hero-'));

  return (
    <section id="home" className="relative h-[80dvh] min-h-[500px] w-full">
      <ImageTransition images={heroImages} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Beautiful Interiors For Your Life
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 sm:text-xl">
            We design and build beautiful, functional, and timeless interiors that are tailored to your lifestyle. We are a team of passionate designers who love creating spaces that inspire.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="#contact">
                Get Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
