import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FadeIn } from '@/components/fade-in';

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-image');

  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg sm:h-96 lg:h-[450px]">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </div>
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                About Us
              </h2>
              <p className="mt-6 text-lg leading-8 text-foreground/80">
                VK Interiors is a creative design studio passionate about crafting stylish and functional living and workspaces. We believe that great design can transform spaces and inspire lives. Our team is dedicated to understanding your vision and bringing it to life with elegance, innovation, and meticulous attention to detail.
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground/80">
                From cozy homes to dynamic corporate offices, we handle every project with a commitment to quality and a unique creative flair.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

    