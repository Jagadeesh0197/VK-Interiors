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
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="your@email.com" required className="mt-2" />
                        {state.errors?.email && <p className="mt-2 text-sm text-destructive">{state.errors.email[0]}</p>}
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
                        <h3 className="text-xl font-semibold">Contact Information</h3>
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
                    </div>
                </div>
            </FadeIn>
        </div>
      </div>
    </section>
  );
}
