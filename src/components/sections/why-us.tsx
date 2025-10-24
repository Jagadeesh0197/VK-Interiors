"use client";

import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, PencilRuler, Gem, Clock, Medal, Smile } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useBreakpoint } from '@/hooks/use-breakpoint';

const reasons = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Experienced Team",
    description: "Our skilled professionals bring years of experience and creativity to every project."
  },
  {
    icon: <PencilRuler className="h-8 w-8 text-primary" />,
    title: "Customized Designs",
    description: "We tailor every design to your unique tastes, needs, and lifestyle."
  },
  {
    icon: <Gem className="h-8 w-8 text-primary" />,
    title: "Quality Materials",
    description: "We use only high-quality, durable materials to ensure lasting beauty and functionality."
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Timely Delivery",
    description: "We are committed to completing projects on schedule without compromising on quality."
  },
  {
    icon: <Medal className="h-8 w-8 text-primary" />,
    title: "Competitive Pricing",
    description: "Get premium interior design services at competitive and transparent prices."
  },
  {
    icon: <Smile className="h-8 w-8 text-primary" />,
    title: "Customer Satisfaction",
    description: "Your satisfaction is our top priority, from initial concept to final handover."
  }
];

const getCardTransforms = (index: number, numCols: number) => {
    const row = Math.floor(index / numCols);
    const col = index % numCols;

    const yOffset = 110; 
    const y = row * yOffset;

    let x = 0;
    if (numCols === 2) {
      // For 2 columns, cards are 50% width. We want to move them to -25% and 25% to be centered.
      // x-translate is relative to the element's own size.
      // So -50% and 50% will place them side-by-side with no gap.
      x = col === 0 ? -52 : 52; // adding a little for the gap
    } else if (numCols === 3) {
        // For 3 columns, cards are ~33.3% width. 
        // Middle card is at 0. Left and right are +/- 100% of their own width.
      if (col === 0) x = -104;
      if (col === 2) x = 104;
    }

    return {
      initial: { x: "-50%", y: 0, scale: 1, zIndex: reasons.length - index },
      animate: { x: `${x}%`, y: `${y}%`, scale: 1, zIndex: reasons.length - index },
    };
};


export function WhyUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { isLg, isSm } = useBreakpoint();

  const numCols = isLg ? 3 : isSm ? 2 : 1;
  const gridHeight = Math.ceil(reasons.length / numCols) * 280; // Approximate height

  return (
    <section id="why-us" className="py-20 sm:py-32 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Choose Us?
            </h2>
            <p className="mt-4 text-lg leading-8 text-foreground/80">
                The pillars of our success and your satisfaction.
            </p>
        </motion.div>
        
        <div ref={ref} className="mt-24 relative" style={{ height: `${gridHeight}px` }}>
          {reasons.map((reason, index) => {
            const { initial, animate } = getCardTransforms(index, numCols);
            
            return (
              <motion.div
                key={index}
                className="absolute w-full sm:w-1/2 lg:w-1/3 p-4"
                style={{ top: 0, left: '50%', transform: "translateX(-50%)" }}
                initial={initial}
                animate={isInView ? animate : initial}
                transition={{ 
                    type: 'spring', 
                    stiffness: 80, 
                    damping: 15,
                    delay: isInView ? index * 0.1 : 0
                }}
              >
                <Card className="h-full text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {reason.icon}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <CardTitle className="text-xl font-semibold">{reason.title}</CardTitle>
                    <p className="text-foreground/70">{reason.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
