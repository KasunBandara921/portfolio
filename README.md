This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



To make a premium contact section, we avoid generic, clunky forms. We will build a clean, minimalist glass-card form that uses react-hook-form for validation and EmailJS to send the message directly to your inbox without needing a backend server.

Step 1: Set up EmailJS
Go to EmailJS and create a free account.

Create an "Email Service" (e.g., Gmail).

Create an "Email Template" and note your Service ID, Template ID, and Public Key (from the "API" section).

Step 2: Create the Contact Component
Create src/components/Contact.tsx.



"use client";

import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();

  const sendEmail = (data: any) => {
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", data, "YOUR_PUBLIC_KEY")
      .then(() => {
        alert("Message sent!");
        reset();
      });
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-2xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-[var(--color-card)] p-10 rounded-[24px] border border-white/5"
      >
        <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
        <form onSubmit={handleSubmit(sendEmail)} className="space-y-6">
          <input {...register("name")} placeholder="Name" className="w-full bg-transparent border-b border-white/10 p-3 outline-none focus:border-[var(--color-primary)] transition-colors" required />
          <input {...register("email")} type="email" placeholder="Email" className="w-full bg-transparent border-b border-white/10 p-3 outline-none focus:border-[var(--color-primary)] transition-colors" required />
          <textarea {...register("message")} placeholder="Message" className="w-full bg-transparent border-b border-white/10 p-3 outline-none focus:border-[var(--color-primary)] transition-colors h-32" required />
          
          <button type="submit" className="w-full py-4 bg-[var(--color-primary)] text-white rounded-full font-medium hover:opacity-90 transition-opacity">
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
}