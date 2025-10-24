import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, PencilRuler, Gem, Clock, Medal, Smile } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { FadeInFromLeft } from '@/components/fade-in-from-left';
import { FadeInFromRight } from '@/components/fade-in-from-right';

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
  return (
    <section id="why-us" className="py-20 sm:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Choose Us?
            </h2>
            <p className="mt-4 text-lg leading-8 text-foreground/80">
                The pillars of our success and your satisfaction.
            </p>
        </FadeIn>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            let AnimationComponent;
            // Logic for large screens (3 columns)
            if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
              if (index % 3 === 0) {
                AnimationComponent = FadeInFromLeft;
              } else if (index % 3 === 2) {
                AnimationComponent = FadeInFromRight;
              } else {
                AnimationComponent = FadeIn;
              }
            } 
            // Logic for medium screens (2 columns)
            else if (typeof window !== 'undefined' && window.innerWidth >= 640) {
              if (index % 2 === 0) {
                AnimationComponent = FadeInFromLeft;
              } else {
                AnimationComponent = FadeInFromRight;
              }
            }
            // Logic for small screens (1 column)
            else {
              AnimationComponent = FadeIn;
            }

            return (
              <AnimationComponent key={index} className="h-full">
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
              </AnimationComponent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
