import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { FadeIn } from "@/components/fade-in";
  
const faqs = [
    {
        question: "What is the first step to start a project with VK Interiors?",
        answer: "The first step is to schedule a free initial consultation with us. You can do this by filling out the contact form on our website. During this meeting, we'll discuss your vision, requirements, budget, and timeline to see how we can best help you."
    },
    {
        question: "How long does a typical interior design project take?",
        answer: "The timeline for a project varies greatly depending on the scope and complexity. A single room design might take a few weeks, while a full home renovation could take several months. We provide a detailed project timeline after the initial consultation."
    },
    {
        question: "How do you charge for your services?",
        answer: "Our pricing structure is flexible to suit different project needs. We may charge a flat fee, an hourly rate, or a percentage of the total project cost. We'll discuss the best option for you and provide a transparent quote upfront."
    },
    {
        question: "Can you work with my existing furniture and decor?",
        answer: "Absolutely! We believe in creating spaces that are true to you. We can certainly incorporate your existing furniture and decor into the new design, and help you decide which pieces to keep, repurpose, or replace."
    },
    {
        question: "What is your design style?",
        answer: "Our team is versatile and experienced in a wide range of design styles, from modern and minimalist to classic and eclectic. Our primary goal is to create a design that reflects your personal style and preferences, not to impose our own."
    },
    {
        question: "Do you manage the entire project, including contractors?",
        answer: "Yes, we offer full project management services. We can coordinate with and oversee all contractors, suppliers, and tradespeople to ensure a smooth process and high-quality result, from concept to completion."
    }
]
  
export function FaqSection() {
    return (
        <section id="faq" className="py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-foreground/80">
                        Find answers to common questions about our services and process.
                    </p>
                </FadeIn>

                <FadeIn className="mt-16 mx-auto max-w-3xl">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-foreground/80">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </FadeIn>
            </div>
        </section>
    )
}
