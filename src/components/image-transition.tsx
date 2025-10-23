
"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { type ImagePlaceholder } from '@/lib/placeholder-images';

const Strip = ({
  imageUrl,
  position,
  rotation,
  delay,
}: {
  imageUrl: string;
  position: { top: string; left: string; width: string; height: string };
  rotation: number;
  delay: number;
}) => {
  return (
    <motion.div
      className="absolute"
      style={{
        ...position,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: rotation }}
      exit={{ rotateY: 0 }}
      transition={{ duration: 0.8, delay }}
    />
  );
};

export function ImageTransition({ images, strips = 10 }: { images: ImagePlaceholder[], strips?: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 1200);
  }, [isAnimating, images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextImage]);

  const currentImage = images[currentImageIndex];
  const nextImageIndex = (currentImageIndex + 1) % images.length;
  const nextImageData = images[nextImageIndex];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        <Image
          key={currentImage.id}
          src={currentImage.imageUrl}
          alt={currentImage.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={currentImage.imageHint}
        />
      </AnimatePresence>
      <div className="absolute inset-0">
        {Array.from({ length: strips }).map((_, i) => {
          const position = {
            top: '0',
            left: `${(100 / strips) * i}%`,
            width: `${100 / strips}%`,
            height: '100%',
          };
          
          return (
            <div key={i} className="absolute" style={{...position, transformStyle: 'preserve-3d'}}>
                <Strip
                    imageUrl={currentImage.imageUrl}
                    position={{...position, left: `-${(100 / strips) * i}%`}}
                    rotation={isAnimating ? 180 : 0}
                    delay={i * 0.05}
                />
                <Strip
                    imageUrl={nextImageData.imageUrl}
                    position={{...position, left: `-${(100 / strips) * i}%`}}
                    rotation={isAnimating ? 0 : -180}
                    delay={i * 0.05}
                />
            </div>
          );
        })}
      </div>
    </div>
  );
};
