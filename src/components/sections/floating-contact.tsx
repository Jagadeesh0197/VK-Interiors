"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Sending..." : "Submit"}
    </Button>
  );
}

export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const initialState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Success!",
        description: state.message,
      });
      setIsOpen(false); 
    } else if (state.message && state.errors) {
       toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full h-14 w-14 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open contact form"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <Card className="w-80 shadow-2xl">
              <CardHeader className="text-center relative">
                <CardTitle>Quick Connect</CardTitle>
                <CardDescription>Leave your details and we'll get back to you.</CardDescription>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Button>
              </CardHeader>
              <CardContent>
                <form action={dispatch} className="space-y-4">
                  <div>
                    <Label htmlFor="floating-name">Name</Label>
                    <Input id="floating-name" name="name" type="text" placeholder="Your Name" required className="mt-1" />
                    {state.errors?.name && <p className="mt-1 text-sm text-destructive">{state.errors.name[0]}</p>}
                  </div>
                  <div>
                    <Label htmlFor="floating-contactInfo">Email / Mobile</Label>
                    <Input id="floating-contactInfo" name="contactInfo" type="text" placeholder="your@email.com or mobile" required className="mt-1" />
                    {state.errors?.contactInfo && <p className="mt-1 text-sm text-destructive">{state.errors.contactInfo[0]}</p>}
                  </div>
                   <div>
                        <Label htmlFor="floating-message" className="sr-only">Message</Label>
                        <Input id="floating-message" name="message" type="hidden" defaultValue="Interested in your services." />
                    </div>
                  <SubmitButton />
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
