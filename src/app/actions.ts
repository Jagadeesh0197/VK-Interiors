"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contactInfo: z.string().min(1, { message: "Email or mobile number is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
}).superRefine((data, ctx) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    const basicPhoneRegex = /^\d{10,}$/; // Simple check for at least 10 digits

    if (!emailRegex.test(data.contactInfo) && !phoneRegex.test(data.contactInfo) && !basicPhoneRegex.test(data.contactInfo)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please enter a valid email or mobile number.",
            path: ["contactInfo"],
        });
    }
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    contactInfo: formData.get("contactInfo"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors and try again.",
      success: false,
    };
  }
  
  // Here you would typically save the data to your database (e.g., Firestore)
  // For this example, we'll just log it and simulate a success response.
  console.log("Form data received:", validatedFields.data);

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: "Thank you for your message! We'll get back to you soon.",
    success: true,
  };
}
