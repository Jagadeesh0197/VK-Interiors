"use client";

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FadeIn } from '@/components/fade-in';
import { ZoomIn } from 'lucide-react';

export function GallerySection() {
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-'));
  const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | null>(null);

  return (
    <section id="gallery" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Projects
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
            A glimpse into the spaces we've transformed.
          </p>
        </FadeIn>
        
        <FadeIn className="mt-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative block h-64 w-full overflow-hidden rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label={`View image: ${image.description}`}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  data-ai-hint={image.imageHint}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <ZoomIn className="h-12 w-12 text-white/80" />
                </div>
              </button>
            ))}
          </div>
        </FadeIn>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
          {selectedImage && (
            <>
              <DialogTitle className="sr-only">{selectedImage.description}</DialogTitle>
              <DialogDescription className="sr-only">
                Enlarged view of {selectedImage.description}
              </DialogDescription>
              <div className="relative aspect-video w-full">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.description}
                  fill
                  className="object-contain"
                  data-ai-hint={selectedImage.imageHint}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
