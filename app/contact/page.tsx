'use client';

import { motion } from 'framer-motion';
import { Instagram as InstagramRaw, Message as MessageRaw, Phone as PhoneRaw } from 'iconoir-react';
import { useState, type FormEvent, type ComponentType, type SVGProps } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import JsonLd from '../../components/JsonLd';
import { BUSINESS_TELEPHONE, buildBreadcrumbSchema } from '../../lib/site';

const sectionFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

const Instagram = InstagramRaw as unknown as ComponentType<SVGProps<SVGSVGElement>>;
const Message = MessageRaw as unknown as ComponentType<SVGProps<SVGSVGElement>>;
const Phone = PhoneRaw as unknown as ComponentType<SVGProps<SVGSVGElement>>;

type ContactFormFields = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const [formState, setFormState] = useState<ContactFormFields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<ContactFormFields>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setErrors({});
    setServerError(null);

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.errors) {
        setErrors(result.errors);
      } else {
        setServerError(result.error || 'Unable to send your message. Please try again later.');
      }
      setStatus('error');
      return;
    }

    setFormState({ name: '', email: '', message: '' });
    setStatus('success');
  }

  return (
    <main className="min-h-screen bg-background text-text-dark">
      <Navbar />
      <motion.section className="container mx-auto py-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionFade}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[3rem] bg-white p-8 shadow-soft sm:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Get in touch</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Reserve your handcrafted chocolate treats for pickup in Oulu.</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5a4030] sm:text-base">
              Send your request through the form, Instagram, Whatsapp or email. We will reply quickly and help you reserve a pickup slot for fresh baked goods from our home kitchen.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-[2rem] bg-[#fff4dd] p-6 shadow-soft">
                <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">Pickup location</p>
                <p className="mt-2 text-sm leading-7 text-[#5a4030]">Peltolankaari 20, 90230, Oulu, Finland</p>
              </div>
              <div className="rounded-[2rem] bg-[#fff4dd] p-6 shadow-soft">
                <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">Pickup hours</p>
                <p className="mt-2 text-sm leading-7 text-[#5a4030]">Fri 17:00–21:00 · Sat-Sunday 16:00–20:00</p>
              </div>
              {BUSINESS_TELEPHONE ? (
                <div className="rounded-[2rem] bg-[#fff4dd] p-6 shadow-soft">
                  <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">Phone</p>
                  <a
                    href={`tel:${BUSINESS_TELEPHONE.replace(/\s/g, '')}`}
                    className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-cocoa"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {BUSINESS_TELEPHONE}
                  </a>
                </div>
              ) : null}
            </div>

            <div className="mt-10 rounded-[2rem] bg-[#fff8e8] p-8 shadow-soft">
              <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">Custom Orders and Enquiries</p>
              <p className="mt-2 text-sm leading-7 text-[#5a4030]">
                Use the form below for custom cakes, celebration orders, large quantities, dietary requests, or general questions. We will get back to you as soon as possible to discuss your requirements and available pickup dates.
              </p>
              <a href="mailto:info@suklaamo.fi" className="mt-4 inline-flex items-center rounded-full bg-[#fff1d6] px-4 py-2 text-sm font-semibold text-primary hover:bg-[#ffe5b3]">
                info@suklaamo.fi
              </a>
            </div>

            <div className="mt-10 rounded-[3rem] bg-white p-8 shadow-soft">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="group relative block overflow-hidden rounded-[1rem] border border-border bg-[#fbf7f0] px-4 pb-3 pt-6 text-sm text-text-dark transition focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/20">
                    <span className="absolute left-4 top-3 text-xs uppercase tracking-[0.28em] text-text-muted transition-all group-focus-within:text-primary">
                      Name
                    </span>
                    <input
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className="mt-2 w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
                    />
                    {errors.name ? <p id="contact-name-error" className="mt-2 text-xs text-red-600">{errors.name}</p> : null}
                  </label>
                  <label className="group relative block overflow-hidden rounded-[1rem] border border-border bg-[#fbf7f0] px-4 pb-3 pt-6 text-sm text-text-dark transition focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/20">
                    <span className="absolute left-4 top-3 text-xs uppercase tracking-[0.28em] text-text-muted transition-all group-focus-within:text-primary">
                      Email
                    </span>
                    <input
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className="mt-2 w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
                    />
                    {errors.email ? <p id="contact-email-error" className="mt-2 text-xs text-red-600">{errors.email}</p> : null}
                  </label>
                </div>

                {/*
                  FIX: previously the "WHAT DO YOU WANT?" caption was absolutely
                  positioned on top of the textarea (like the floating labels
                  above), with only pt-6 pushing the textarea down to clear it.
                  That gap wasn't tall enough to fully clear the caption's own
                  line height + letter tracking, so the first line of typed
                  text rendered partly underneath the label and got clipped by
                  overflow-hidden on the wrapper.
                  Fix: the caption is now a normal, non-overlapping block above
                  the textarea (like a standard label), and overflow-hidden is
                  removed since there's nothing left to clip.
                */}
                <label className="group relative block rounded-[1rem] border border-border bg-[#fbf7f0] text-sm text-text-dark transition focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/20">
                  <span className="block px-4 pt-3 text-xs uppercase tracking-[0.28em] text-text-muted transition-all group-focus-within:text-primary">
                    What do you want?
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className="block w-full min-h-[7.5rem] resize-y border-0 bg-transparent px-4 pb-3 text-sm leading-6 outline-none focus:ring-0"
                  />
                  {errors.message ? <p id="contact-message-error" className="mx-4 mb-3 text-xs text-red-600">{errors.message}</p> : null}
                </label>

                {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}
                {status === 'success' ? <p className="text-sm text-green-600">Your request has been sent. I will respond shortly.</p> : null}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#d38a24] focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Message className="h-4 w-4" aria-hidden="true" />
                  {status === 'submitting' ? 'Sending...' : 'Send request'}
                </button>
              </form>
            </div>
          </div>

          <aside className="space-y-8 rounded-[3rem] bg-[#fff4dd] p-8 shadow-soft">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-primary">Instagram</p>
              <a href="https://instagram.com/suklaamoo" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#2d180f]">
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

      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ])}
      />
      <Footer />
    </main>
  );
}
