"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Briefcase, Building, Hotel, Dumbbell, Scissors, DraftingCompass } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Home className="h-8 w-8 text-primary" />,
    title: "Home Interior",
    description: "Creating beautiful and functional living spaces that reflect your personal style."
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: "Office Interior",
    description: "Designing inspiring and productive workspaces that align with your brand."
  },
  {
    icon: <Building className="h-8 w-8 text-primary" />,
    title: "Commercial Interior",
    description: "Tailored designs for retail, showrooms, and other commercial establishments."
  },
  {
    icon: <Hotel className="h-8 w-8 text-primary" />,
    title: "Hospitality Interior",
    description: "Crafting inviting and memorable experiences for hotels, restaurants, and cafes."
  },
  {
    icon: <Dumbbell className="h-8 w-8 text-primary" />,
    title: "GYM Interior",
    description: "Energetic and motivational environments for fitness centers and gyms."
  },
  {
    icon: <Scissors className="h-8 w-8 text-primary" />,
    title: "Salon Interior",
    description: "Chic and stylish interiors for beauty salons and barbershops."
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M8.5 10c0-1.28.21-2.5.6-3.65" />
        <path d="M6.29 6.29A10.01 10.01 0 0 0 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-2.02-.6-3.9-1.64-5.44" />
        <path d="M15.5 10c0-1.28-.21-2.5-.6-3.65" />
        <path d="M17.71 6.29A10.01 10.01 0 0 1 22 12c0 .35-.02.7-.05 1.04" />
        <path d="M12 2a2.24 2.24 0 0 0-1.5.55 2.23 2.23 0 0 0-1.42 2.62C9.43 6.9 10.67 8 12 8s2.57-1.1 2.92-2.83A2.23 2.23 0 0 0 13.5 2.55 2.24 2.24 0 0 0 12 2z" />
        <path d="M12 12s-3.5 2-4.5 4c-2.33 4.67 2.5 8 8.5 4.5 2.25-1.31 4.5-5.5 4.5-5.5" />
      </svg>
    ),
    title: "Spa Interior",
    description: "Creating serene and tranquil atmospheres for spas and wellness centers."
  },
  {
    icon: <DraftingCompass className="h-8 w-8 text-primary" />,
    title: "Architectural Design",
    description: "Innovative and sustainable architectural solutions from concept to completion."
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Services
            </h2>
            <p className="mt-4 text-lg leading-8 text-foreground/80">
                Comprehensive design solutions for every space.
            </p>
        </FadeIn>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <FadeIn key={index} className="h-full">
              <Card className="h-full text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card">
                <CardHeader>
                  <div
                    className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 overflow-hidden"
                  >
                    <motion.div
                      initial={{ x: '-110%' }}
                      whileInView={{ x: '0%' }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                        delay: 0.2 + index * 0.1,
                      }}
                    >
                      {service.icon}
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                  <p className="text-foreground/70">{service.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
