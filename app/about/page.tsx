import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SectionHeading from '../../components/SectionHeading';
import Badge from '../../components/Badge';
import PhotoMarquee from '../../components/PhotoMarquee';

const values = [
  {
    title: 'Quality over quantity',
    description: 'I bake in small batches so every treat gets the attention it deserves.',
    variant: 'cocoa',
  },
  {
    title: 'Real ingredients',
    description: 'Good baking starts with good ingredients. No shortcuts here.',
    variant: 'sage',
  },
  {
    title: 'Baking with care',
    description: 'Every batch is made as if it is being served to friends and family.',
    variant: 'berry',
  },
  {
    title: 'Community first',
    description: 'I love being part of local moments and simple celebrations.',
    variant: 'cocoa',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-text-dark">
      <Navbar />
      <section className="container mx-auto py-16 space-y-16">
        <div className="rounded-[3rem] bg-white p-8 shadow-soft sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-primary">Our story</p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Most days ended in front of a screen.</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#5a4030] sm:text-lg">
            Baking became the part of the day I looked forward to. I would come home, make a coffee, put on some music and start baking. It was a quiet way to slow down after work, and it felt like the one place I could make something that smelled good and felt right.
          </p>
        </div>

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="rounded-[3rem] bg-[#fff5e6] p-10 shadow-soft">
            <h2 className="text-3xl font-black text-primary">Suklaamo started after work</h2>
            <p className="mt-6 text-base leading-7 text-[#5a4030]">
              After a long day of engineering work, the kitchen became my favourite place. I would make a coffee and let baking take over for a little while.
            </p>
            <p className="mt-4 text-base leading-7 text-[#5a4030]">
              It started with brownies and cookies for friends. Soon people began to ask if I could bake for birthdays and small moments. That is how Suklaamo found its way from my evening routine into the world.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-[3rem] bg-[#f7e1cc] p-8 shadow-soft">
              <p className="text-sm uppercase tracking-[0.35em] text-primary">Quote</p>
              <p className="mt-6 text-2xl font-black leading-tight text-[#58331a]">
                &quot;The kitchen became my favourite place after a long day of engineering work.&quot;
              </p>
            </div>
            <div className="overflow-hidden rounded-[3rem] bg-white shadow-soft">
              <div className="relative h-[320px] sm:h-[420px]">
                <Image src="/products/img-06.webp" alt="Bakery treats" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="overflow-hidden rounded-[3rem] bg-white shadow-soft">
            <div className="relative h-[520px]">
              <Image src="/founder/founder.png" alt="Founder" fill className="object-cover" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[3rem] bg-[#fff5e6] p-10 shadow-soft">
              <h2 className="text-3xl font-black text-primary">Meet the founder</h2>
              <p className="mt-5 text-base leading-7 text-[#5a4030]">
                I am an engineer with a master&apos;s degree. I love coffee and I bake because it makes the evenings feel warmer. Every recipe still starts with the question: would I want to eat this myself?
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-white p-5 text-sm text-[#5a4030] shadow-soft">
                  <span className="block text-2xl">☕</span>
                  Coffee icon
                </div>
                <div className="rounded-[2rem] bg-white p-5 text-sm text-[#5a4030] shadow-soft">
                  <span className="block text-2xl">🎓</span>
                  Engineering icon
                </div>
                <div className="rounded-[2rem] bg-white p-5 text-sm text-[#5a4030] shadow-soft">
                  <span className="block text-2xl">🍫</span>
                  Baking icon
                </div>
                <div className="rounded-[2rem] bg-white p-5 text-sm text-[#5a4030] shadow-soft">
                  <span className="block text-2xl">🏡</span>
                  Dream café icon
                </div>
              </div>
            </div>

            <div className="rounded-[3rem] bg-white p-8 shadow-soft">
              <p className="text-sm uppercase tracking-[0.35em] text-primary">Founder facts</p>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#5a4030]">
                <li>📍 Oulu</li>
                <li>☕ Coffee lover</li>
                <li>🎓 Engineer</li>
                <li>🍫 Chocolate obsessed</li>
                <li>🏡 Dreaming of a small neighbourhood café</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading title="Our values" subtitle="What matters at Suklaamo." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <div key={item.title} className="rounded-[2rem] border border-[#e6d5c2] bg-white p-7 shadow-soft">
                <Badge label={item.title} variant={item.variant as 'cocoa' | 'berry' | 'sage'} />
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
      </section>
      <Footer />
    </main>
  );
}
