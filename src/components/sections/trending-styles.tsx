"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from '@/components/fade-in';

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

function TickerTapeCarousel({ images }: { images: ImagePlaceholder[] }) {
  // Duplicate images for a seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="group w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
        {duplicatedImages.map((image, index) => (
          <div key={`${image.id}-${index}`} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2">
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
        ))}
      </div>
    </div>
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
                  <TickerTapeCarousel images={images} />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
