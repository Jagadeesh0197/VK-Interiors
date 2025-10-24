"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, PencilRuler, Gem, Clock, Medal, Smile } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

export function WhyUsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = (index: number) => {
    // Determine the origin point for the animation
    let originX = 0;
    let originY = 0;
    let delay = 0;

    const isSecondRow = index >= 3;
    const col = index % 3;

    if (isSecondRow) {
      // Row 2 animation logic
      const baseIndex = index - 3;
      delay = 0.6; // Start after first row
      if (baseIndex === 1) { // Center card ("Competitive Pricing")
        originX = "0%";
        originY = "100%";
        delay += 0.2;
      } else if (baseIndex === 2) { // Right card ("Customer Satisfaction")
        originX = "-100%";
        originY = "100%";
        delay += 0.4;
      } else { // Left card ("Timely Delivery")
        originX = "0%";
        originY = "0%";
      }
    } else {
      // Row 1 animation logic
      if (col === 1) { // Center card ("Customized Designs")
        originX = "-100%";
        originY = "0%";
        delay = 0.2;
      } else if (col === 2) { // Right card ("Quality Materials")
        originX = "-200%";
        originY = "0%";
        delay = 0.4;
      } else { // Left card ("Experienced Team")
        originX = "0%";
        originY = "0%";
      }
    }

    return {
      hidden: { opacity: 0, x: originX, y: originY, scale: 0.8 },
      visible: {
        opacity: 1,
        x: '0%',
        y: '0%',
        scale: 1,
        transition: {
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay,
        },
      },
    };
  };

  return (
    <section id="why-us" className="py-20 sm:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/80">
            The pillars of our success and your satisfaction.
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((reason, index) => (
            <motion.div key={index} variants={cardVariants(index)}>
              <Card className="h-full text-center bg-card transition-shadow duration-300 hover:shadow-xl">
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}