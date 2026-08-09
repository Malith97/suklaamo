'use client';

import Image from 'next/image';
import { useState } from 'react';
import SmartImage from '../../components/SmartImage';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SectionHeading from '../../components/SectionHeading';
import PhotoMarquee from '../../components/PhotoMarquee';

const kitchenValues = [
  {
    title: 'Good ingredients',
    description: 'Dark chocolate, butter, cream and eggs. I keep the pantry short and honest.',
  },
  {
    title: 'Small batch baking',
    description: 'I bake quietly, in few batches, so every order is fresh and easy to hold.',
  },
  {
    title: 'Honest flavours',
    description: 'No fake fillings, no shortcuts. The taste comes from real chocolate and careful baking.',
  },
  {
    title: 'Made locally',
    description: 'Every treat is baked in Oulu. I want this to feel like a neighbourhood kitchen.',
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } },
};

const staggers = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export default function AboutPage() {
  const [founderLoaded, setFounderLoaded] = useState(false);
  const [founderError, setFounderError] = useState(false);
  return (
    <main className="min-h-screen bg-background text-text-dark">
      <Navbar />

      <motion.section
        className="container mx-auto py-16 space-y-14 lg:space-y-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggers}
      >
        <motion.div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center" variants={sectionVariant}>
          <motion.div
            className="overflow-hidden rounded-[3rem] bg-[#f7e0cd] p-8 shadow-soft sm:p-10 lg:max-w-[600px] lg:mx-auto"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="h-[500px] w-full rounded-[2.5rem] sm:h-[600px] lg:h-[700px] overflow-hidden"
            >
              <Image src="/founder/founder.png" alt="Founder of Suklaamo" width={1200} height={1000} className="h-full w-full object-cover" />
            </motion.div>
          </motion.div>

          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-accent-cocoa">Meet the baker</p>
            <h1 className="text-4xl font-black leading-tight text-primary sm:text-5xl">
              A hobby baker who loves chocolate, coffee and the people who share the treats.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[#5a4030] sm:text-lg">
              I started baking because I wanted one more sweet thing after a long day. It turned into a habit: good chocolate, a quiet kitchen and the joy of making something for someone else.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-white p-6 shadow-soft">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Coffee first</p>
                <p className="mt-3 text-sm leading-7 text-[#5a4030]">Most days begin with a strong coffee and a look at what the oven will bake next.</p>
              </div>
              <div className="rounded-[2rem] bg-[#fff3e0] p-6 shadow-soft">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Chocolate lover</p>
                <p className="mt-3 text-sm leading-7 text-[#5a4030]">Good chocolate is the heart of every bake here, from brownies to cookie boxes.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="rounded-[3rem] bg-[#fff4df] p-10 shadow-soft" variants={sectionVariant}>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <SectionHeading title="A story from the kitchen" subtitle="How Suklaamo found its rhythm." />
              <p className="mt-6 text-base leading-7 text-[#5a4030]">
                At first it was just a batch of brownies for a friend. The next day I made more to share with neighbours, and it felt right. The kitchen became a place for quiet evenings, warm chocolate and small, honest orders.
              </p>
              <p className="mt-5 text-base leading-7 text-[#5a4030]">
                It is a slow kitchen. I write notes for every order, keep the oven temperature steady and package each box so it arrives looking calm and familiar.
              </p>
            </div>
            <motion.div className="space-y-4 rounded-[2.5rem] bg-white p-8 shadow-soft" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 260, damping: 24, duration: 0.22 }}>
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-accent-berry" />
                <div>
                  <p className="text-sm font-semibold text-primary">First orders were for friends.</p>
                  <p className="mt-2 text-sm leading-7 text-[#5a4030]">A batch of brownies and a few cookies turned into a small weekly routine.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-accent-sage" />
                <div>
                  <p className="text-sm font-semibold text-primary">Every recipe is pared back.</p>
                  <p className="mt-2 text-sm leading-7 text-[#5a4030]">There is no fuss. Just good ingredients and a kitchen that feels like home.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-accent-gold" />
                <div>
                  <p className="text-sm font-semibold text-primary">I bake for moments, not trends.</p>
                  <p className="mt-2 text-sm leading-7 text-[#5a4030]">Small cakes, cookie boxes and brownies are made for birthdays, coffee breaks and everyday treats.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.section variants={staggers}>
          <motion.div variants={sectionVariant}>
            <SectionHeading title="A founder's note" subtitle="A simple view of how I bake." />
          </motion.div>

          <motion.div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start" variants={sectionVariant}>
            <div className="rounded-[3rem] bg-white p-10 shadow-soft">
              <p className="text-base leading-7 text-[#5a4030]">
                I bake in the evenings and on slow mornings. The kitchen is where I test new cookie ideas, finish a batch of brownies and wrap orders with a little note. It is all very small, but I want every box to feel like a warm gift.
              </p>
              <p className="mt-6 text-base leading-7 text-[#5a4030]">
                The best part is hearing that the treats made someone’s coffee better or a family gathering sweeter. That is what keeps this little bakery going.
              </p>
            </div>
            <motion.div className="rounded-[3rem] bg-[#f4e2d0] p-10 shadow-soft" whileHover={{ y: -2 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
              <p className="text-sm uppercase tracking-[0.35em] text-accent-cocoa">Founder quote</p>
              <p className="mt-6 text-3xl font-black leading-tight text-primary sm:text-4xl">
                “I bake for the quiet mornings, the small celebrations and the people who choose a treat made with care.”
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        <section>
          <SectionHeading title="What matters in our kitchen" subtitle="The simple things I never compromise on." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {kitchenValues.map((item) => (
              <div key={item.title} className="rounded-[2rem] bg-white p-7 shadow-soft">
                <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#5a4030]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading title="Photo gallery" subtitle="A rolling view of the kitchen and treats." />
          <div className="mt-8">
            <PhotoMarquee />
          </div>
        </section>
      </motion.section>

      <Footer />
    </main>
  );
}
