import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SectionHeading from '../../components/SectionHeading';
import Badge from '../../components/Badge';

const values = [
  { title: 'Small-batch', description: 'Every item is baked to order in a warm home kitchen.', variant: 'cocoa' },
  { title: 'Local ingredients', description: 'We source Finnish butter and fresh pantry staples.', variant: 'sage' },
  { title: 'Real chocolate', description: 'We bake with chocolate, not cocoa powder, for richer flavor.', variant: 'berry' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-text-dark">
      <Navbar />
      <section className="container mx-auto py-16">
        <div className="rounded-[3rem] bg-white p-8 shadow-soft sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-primary">Our story</p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Suklaamo is a premium Finnish bakery built around chocolate-forward baking.</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#5a4030] sm:text-lg">
            Founded for lovers of rich brownies, chewy cookies, and intimate cakes, Suklaamo brings warm flavors and handcrafted goodness to local customers. Every batch is carefully prepared for pickup and special orders.
          </p>
        </div>

        <section className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="rounded-[3rem] bg-[#f7e1cc] p-8 shadow-soft">
            <h2 className="text-3xl font-black text-primary">Meet the founder</h2>
            <p className="mt-5 text-base leading-8 text-[#5a4030]">
              A Finnish baker with a soft spot for chocolate, seasonal ingredients, and cozy conversations. The kitchen is small, the batches are personal, and every order gets a loving touch.
            </p>
          </div>
          <div className="overflow-hidden rounded-[3rem] bg-white shadow-soft">
            <div className="relative h-[420px] sm:h-[520px]">
              <Image src="/gallery/photo-01.svg" alt="Founder placeholder" fill className="object-cover" />
            </div>
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading title="Our values" subtitle="What makes Suklaamo feel warm, familiar, and delicious." />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {values.map((item) => (
              <div key={item.title} className="rounded-[2rem] border border-[#e6d5c2] bg-white p-7 shadow-soft">
                <Badge label={item.title} variant={item.variant as 'cocoa' | 'berry' | 'sage'} />
                <p className="mt-4 text-sm leading-7 text-[#5a4030]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading title="Photo gallery" subtitle="A warm, playful look at our bakery moments and treats." />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="overflow-hidden rounded-[2rem] bg-[#f2e5d4]">
              <Image src="/gallery/photo-02.svg" alt="Gallery placeholder" width={500} height={500} className="h-full w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[2rem] bg-[#f2e5d4]">
              <Image src="/gallery/photo-03.svg" alt="Gallery placeholder" width={500} height={500} className="h-full w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[2rem] bg-[#f2e5d4] sm:col-span-2 xl:col-span-1">
              <Image src="/gallery/photo-04.svg" alt="Gallery placeholder" width={500} height={500} className="h-full w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[2rem] bg-[#f2e5d4] sm:col-span-2 xl:col-span-1">
              <Image src="/gallery/photo-01.svg" alt="Gallery placeholder" width={500} height={500} className="h-full w-full object-cover" />
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}
