"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, PencilRuler, Gem, Clock, Medal, Smile } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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

const CARD_WIDTH_LG = 350; // Approximate width of a card on large screens
const CARD_GAP_LG = 32;
const CARD_WIDTH_SM = 300; // Approximate width on small screens
const CARD_GAP_SM = 32;


export function WhyUsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const { isLg, isSm } = useBreakpoint();

    const getCardPosition = (index: number) => {
        const centerIndex = 1; 

        if (isLg) { // 3-column layout
            const col = index % 3;
            const row = Math.floor(index / 3);
            const x = (col - 1) * (CARD_WIDTH_LG + CARD_GAP_LG);
            const y = row * 40; 
            return { x, y, rotate: 0 };
        }
        
        if (isSm) { // 2-column layout
            const col = index % 2;
            const row = Math.floor(index / 2);
            const x = (col - 0.5) * (CARD_WIDTH_SM + CARD_GAP_SM);
            const y = row * 40;
            return { x, y, rotate: 0 };
        }

        // 1-column layout
        return { x: 0, y: index * 30, rotate: 0 };
    };

    return (
        <section id="why-us" className="py-20 sm:py-32 bg-secondary/20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Why Choose Us?
                </h2>
                <p className="mt-4 text-lg leading-8 text-foreground/80">
                    The pillars of our success and your satisfaction.
                </p>
            </FadeIn>
            
            <div ref={ref} className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 relative h-[600px] sm:h-[800px] lg:h-[500px]">
            {reasons.map((reason, index) => {
                const isCenterCard = index === 1;
                const finalPos = getCardPosition(index);

                return (
                <motion.div
                    key={index}
                    className="absolute w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)]"
                    style={{ 
                        left: '50%',
                        top: '50%',
                        originX: '50%',
                        originY: '50%',
                    }}
                    initial={{
                        x: '-50%',
                        y: '-50%',
                        rotate: (index - 2.5) * 5,
                        scale: isCenterCard ? 1 : 0.95,
                    }}
                    animate={isInView ? {
                        x: `calc(${finalPos.x}px - 50%)`,
                        y: `calc(${finalPos.y}px - 50%)`,
                        rotate: 0,
                        scale: 1,
                        transition: { 
                            delay: index * 0.1, 
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1] 
                        }
                    } : {}}
                >
                    <Card className={`h-full text-center bg-card transition-shadow duration-300 ${!isInView && index !== 1 ? 'shadow-lg' : ''}`}>
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