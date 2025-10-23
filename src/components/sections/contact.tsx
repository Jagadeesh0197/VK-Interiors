"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone } from "lucide-react";
import { FadeIn } from "../fade-in";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
  
  const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 16.95A8.91 8.91 0 0 1 12.19 16c-3.24 0-5.88-2.64-5.88-5.88 0-.82.17-1.6.47-2.3" />
    </svg>
  );

export function ContactSection() {
  const { toast } = useToast();
  const initialState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Success!",
        description: state.message,
      });
    } else if (state.message && state.errors) {
       toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <section id="contact" className="py-20 sm:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg leading-8 text-foreground/80">
              Have a project in mind? We'd love to hear from you. Fill out the form below to get started.
            </p>
          </div>
        </FadeIn>
        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
            <FadeIn>
                <form action={dispatch} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" type="text" placeholder="Your Name" required className="mt-2" />
                        {state.errors?.name && <p className="mt-2 text-sm text-destructive">{state.errors.name[0]}</p>}
                    </div>
                    <div>
                        <Label htmlFor="contactInfo">Email / Mobile Number</Label>
                        <Input id="contactInfo" name="contactInfo" type="text" placeholder="your@email.com or +919876543210" required className="mt-2" />
                        {state.errors?.contactInfo && <p className="mt-2 text-sm text-destructive">{state.errors.contactInfo[0]}</p>}
                    </div>
                    <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" name="message" placeholder="How can we help you?" required rows={5} className="mt-2" />
                         {state.errors?.message && <p className="mt-2 text-sm text-destructive">{state.errors.message[0]}</p>}
                    </div>
                    <SubmitButton />
                </form>
            </FadeIn>
            <FadeIn>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <p className="mt-2 text-foreground/80">Reach out to us directly through the channels below.</p>
                    </div>
                    <div className="space-y-4 text-lg">
                        <a href="mailto:info@vkinteriors.com" className="flex items-center gap-4 group">
                            <Mail className="h-6 w-6 text-primary" />
                            <span className="group-hover:text-primary transition-colors">info@vkinteriors.com</span>
                        </a>
                        <a href="tel:+919876543210" className="flex items-center gap-4 group">
                            <Phone className="h-6 w-6 text-primary" />
                            <span className="group-hover:text-primary transition-colors">+91-98765-43210</span>
                        </a>
                        <a href="#" className="flex items-center gap-4 group">
                            <InstagramIcon className="h-6 w-6 text-primary" />
                            <span className="group-hover:text-primary transition-colors">Follow us on Instagram</span>
                        </a>
                        <a href="#" className="flex items-center gap-4 group">
                            <WhatsAppIcon className="h-6 w-6 text-primary" />
                            <span className="group-hover:text-primary transition-colors">Chat on WhatsApp</span>
                        </a>
                    </div>
                </div>
            </FadeIn>
        </div>
      </div>
    </section>
  );
}
