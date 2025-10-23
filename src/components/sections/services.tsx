import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Briefcase, ChefHat, Cuboid } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

const services = [
  {
    icon: <Home className="h-8 w-8 text-primary" />,
    title: "Home Interior Design",
    description: "Creating beautiful and functional living spaces that reflect your personal style and enhance your daily life."
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: "Office Interior Design",
    description: "Designing inspiring and productive workspaces that align with your brand identity and foster collaboration."
  },
  {
    icon: <ChefHat className="h-8 w-8 text-primary" />,
    title: "Modular Kitchen Design",
    description: "Crafting modern, efficient, and stylish modular kitchens tailored to your cooking habits and aesthetic preferences."
  },
  {
    icon: <Cuboid className="h-8 w-8 text-primary" />,
    title: "3D Visualization",
    description: "Bringing your vision to life with realistic 3D renderings, allowing you to visualize the final space before construction begins."
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Services
            </h2>
            <p className="mt-4 text-lg leading-8 text-foreground/80">
                Tailored design solutions to meet your every need.
            </p>
        </FadeIn>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <FadeIn key={index} className="h-full">
              <Card className="h-full text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card/50">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {service.icon}
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
