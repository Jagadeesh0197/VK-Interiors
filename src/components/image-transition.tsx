
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
  const isEven = currentImageIndex % 2 === 0;

  const variants = {
    enter: (isEven: boolean) => ({
      opacity: 0,
      scale: isEven ? 1 : 1.1,
      x: isEven ? 100 : -100,
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      scale: isEven ? 1.1 : 1,
      x: 0,
      transition: { duration: 8, ease: "linear" },
    },
    exit: (isEven: boolean) => ({
      zIndex: 0,
      opacity: 0,
      transition: { duration: 1.5 }
    })
  };
  
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={isEven}>
        <motion.div
          key={currentImage.id}
          custom={isEven}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.description}
            fill
            priority={currentImageIndex === 0}
            className="object-cover"
            data-ai-hint={currentImage.imageHint}
            sizes="100vw"
            style={{
                transformOrigin: 'center center'
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
