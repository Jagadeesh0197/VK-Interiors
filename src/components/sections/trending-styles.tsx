"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { FadeIn } from '@/components/fade-in';
import Autoplay from "embla-carousel-autoplay";

const trendingCategories = [
  {
    title: 'Living Room Designs',
    imagePrefix: 'trending-livingroom-',
  },
  {
    title: 'Bedroom Designs',
    imagePrefix: 'trending-bedroom-',
  },
  {
    title: 'Home Outdoor Designs',
    imagePrefix: 'trending-outdoor-',
  },
  {
    title: 'Kitchen Designs',
    imagePrefix: 'trending-kitchen-',
  },
];

function TrendingCarousel({ images }: { images: ImagePlaceholder[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const updateSlideStyles = React.useCallback((api: CarouselApi) => {
    if (!api) return;

    const slides = api.slideNodes();
    const inView = api.slidesInView();

    slides.forEach((slide, index) => {
      if (inView.includes(index)) {
        slide.classList.add('is-snapped');
      } else {
        slide.classList.remove('is-snapped');
      }
    });

    if (inView.length > 0) {
      slides.forEach(s => s.classList.remove('is-snapped'));
      const centerSlideIndex = inView[Math.floor(inView.length / 2)];
       if(slides[centerSlideIndex]) {
         slides[centerSlideIndex].classList.add('is-snapped');
       }
    }

  }, []);


  React.useEffect(() => {
    if (!api) {
      return;
    }
    updateSlideStyles(api);
    api.on("select", updateSlideStyles);
    api.on("reInit", updateSlideStyles);
    
    return () => {
        api.off("select", updateSlideStyles);
        api.off("reInit", updateSlideStyles);
    }
  }, [api, updateSlideStyles]);

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      className="w-full"
      opts={{
        align: "center",
        loop: true,
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="-ml-4">
        {images.map((image) => (
          <CarouselItem key={image.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="overflow-hidden">
                <CardContent className="relative flex aspect-video items-center justify-center p-0">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export function TrendingStylesSection() {
  return (
    <section id="trending" className="py-20 sm:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Currently Trending Styles
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
            Explore the latest trends in interior and exterior design.
          </p>
        </FadeIn>

        <div className="mt-16 space-y-16">
          {trendingCategories.map((category) => {
            const images = PlaceHolderImages.filter(p => p.id.startsWith(category.imagePrefix));
            return (
              <FadeIn key={category.title}>
                <div>
                  <h3 className="text-2xl font-semibold mb-8 text-center">{category.title}</h3>
                  <TrendingCarousel images={images} />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
