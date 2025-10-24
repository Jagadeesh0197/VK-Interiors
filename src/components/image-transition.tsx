
"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { type ImagePlaceholder } from '@/lib/placeholder-images';

export function ImageTransition({ images }: { images: ImagePlaceholder[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 7000); // Change image every 7 seconds

    return () => clearInterval(interval);
  }, [nextImage]);

  const currentImage = images[currentImageIndex];
  const isEven = images.indexOf(currentImage) % 2 === 0;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <AnimatePresence>
        <motion.div
          key={currentImage.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: 1,
            scale: 1.1,
            transition: { duration: 8, ease: "linear" },
          }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1.5 }
          }}
        >
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.description}
            fill
            priority={images.indexOf(currentImage) === 0}
            className="object-cover"
            data-ai-hint={currentImage.imageHint}
            sizes="100vw"
            style={{
                transformOrigin: isEven ? 'center center' : 'top left'
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
