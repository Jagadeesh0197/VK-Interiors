
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
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [nextImage]);

  const currentImage = images[currentImageIndex];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentImage.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.description}
            fill
            priority={images.indexOf(currentImage) === 0}
            className="object-cover"
            data-ai-hint={currentImage.imageHint}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
