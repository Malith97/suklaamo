'use client';

import { motion } from 'framer-motion';
import { Instagram as InstagramRaw, Message as MessageRaw } from 'iconoir-react';
import type { ComponentType, SVGProps } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const sectionFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

const Instagram = InstagramRaw as unknown as ComponentType<SVGProps<SVGSVGElement>>;
const Message = MessageRaw as unknown as ComponentType<SVGProps<SVGSVGElement>>;

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-text-dark">
      <Navbar />
      <motion.section className="container mx-auto py-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionFade}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[3rem] bg-white p-8 shadow-soft sm:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Get in touch</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Reserve your handcrafted chocolate treats for pickup in Oulu.</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5a4030] sm:text-base">
              Send your request through the form, Instagram, Whatsapp or email. We’ll reply quickly and help you reserve a pickup slot for fresh baked goods from our home kitchen.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-[#fff4dd] p-6 shadow-soft">
                <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">Pickup location</p>
                <p className="mt-2 text-sm leading-7 text-[#5a4030]">Peltolankaari 20, 90230, Oulu, Finland</p>
              </div>
              <div className="rounded-[2rem] bg-[#fff4dd] p-6 shadow-soft">
                <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">Pickup hours</p>
                <p className="mt-2 text-sm leading-7 text-[#5a4030]">Fri 17:00–21:00 · Sat-Sunday 16:00–20:00</p>
              </div>
            </div>

            <div className="mt-10 rounded-[2rem] bg-[#fff8e8] p-8 shadow-soft">
              <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">Order note</p>
              <p className="mt-2 text-sm leading-7 text-[#5a4030]">
                Checkout is not available yet. Use the form below or DM us on Instagram/Whatsapp and we’ll confirm your order with a pickup window that works for you.
              </p>
            </div>

            <div className="mt-10 rounded-[3rem] bg-white p-8 shadow-soft">
              <form className="space-y-6">
                <label className="group relative block overflow-hidden rounded-[1rem] border border-border bg-[#fbf7f0] px-4 pb-3 pt-6 text-sm text-text-dark transition focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/20">
                  <span className="absolute left-4 top-3 text-xs uppercase tracking-[0.28em] text-text-muted transition-all group-focus-within:text-primary">
                    Name
                  </span>
                  <input name="name" type="text" placeholder="Your name" className="mt-2 w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0" />
                </label>
                <label className="group relative block overflow-hidden rounded-[1rem] border border-border bg-[#fbf7f0] px-4 pb-3 pt-6 text-sm text-text-dark transition focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/20">
                  <span className="absolute left-4 top-3 text-xs uppercase tracking-[0.28em] text-text-muted transition-all group-focus-within:text-primary">
                    Email
                  </span>
                  <input name="email" type="email" placeholder="you@example.com" className="mt-2 w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0" />
                </label>
                <label className="group relative block overflow-hidden rounded-[1rem] border border-border bg-[#fbf7f0] px-4 pb-3 pt-6 text-sm text-text-dark transition focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/20">
                  <span className="absolute left-4 top-3 text-xs uppercase tracking-[0.28em] text-text-muted transition-all group-focus-within:text-primary">
                    What do you want?
                  </span>
                  <textarea name="message" rows={5} placeholder="Tell us what you need" className="mt-2 w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"></textarea>
                </label>
                <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#d38a24] focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <Message className="h-4 w-4" aria-hidden="true" />
                  Send request
                </button>
              </form>
            </div>
          </div>

          <aside className="space-y-8 rounded-[3rem] bg-[#fff4dd] p-8 shadow-soft">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-primary">Instagram</p>
              <a href="https://instagram.com/suklaamoo" target="_blank" rel="noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#2d180f]">
                <Instagram className="h-4 w-4" aria-hidden="true" />
                @suklaamoo
              </a>
            </div>
            <div className="rounded-[2.5rem] bg-white p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.35em] text-primary">Find us</p>
              <div className="mt-4 overflow-hidden rounded-[2rem] border border-[#d9c8b1] bg-[#f1e2c9]">
                <iframe
                  title="Suklaamo pickup location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21517.972752192845!2d25.431958163381226!3d65.0457456324772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46800d238d2fe471%3A0x274d1d3b24f35dfd!2sPeltolankaari%2020%2C%2090230%20Oulu%2C%20Finland!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  className="h-72 w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </aside>
        </div>
      </motion.section>
      <Footer />
    </main>
  );
}
