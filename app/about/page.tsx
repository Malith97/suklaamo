'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SectionHeading from '../../components/SectionHeading';
import PhotoMarquee from '../../components/PhotoMarquee';
import JsonLd from '../../components/JsonLd';
import { buildBreadcrumbSchema } from '../../lib/site';
import { useLocale } from '../../context/LocaleContext';

export default function AboutPage() {
  const { locale } = useLocale();
  const fi = locale === 'fi';
  const kitchenValues = fi
    ? [
        { title: 'Hyvät raaka-aineet', description: 'Tummaa suklaata, voita, kermaa ja munia. Pidän kaapin sisällön lyhyenä ja rehellisenä.' },
        { title: 'Leivonta pienissä erissä', description: 'Leivon rauhassa pienissä erissä, jotta jokainen tilaus on tuore ja helppo ottaa mukaan.' },
        { title: 'Aidot maut', description: 'Ei keinotekoisia täytteitä eikä oikoteitä. Maku tulee aidosta suklaasta ja huolellisesta leivonnasta.' },
        { title: 'Paikallisesti valmistettu', description: 'Jokainen herkku leivotaan Oulussa. Haluan tämän tuntuvan naapuruston keittiöltä.' },
      ]
    : [
        { title: 'Good ingredients', description: 'Dark chocolate, butter, cream and eggs. I keep the pantry short and honest.' },
        { title: 'Small batch baking', description: 'I bake quietly, in few batches, so every order is fresh and easy to hold.' },
        { title: 'Honest flavours', description: 'No fake fillings, no shortcuts. The taste comes from real chocolate and careful baking.' },
        { title: 'Made locally', description: 'Every treat is baked in Oulu, Finland. I want this to feel like a neighbourhood kitchen.' },
      ];
  return (
    <main className="min-h-screen bg-background text-text-dark">
      <Navbar />

      <section className="container mx-auto py-16 space-y-14 lg:space-y-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-[3rem] bg-[#f7e0cd] p-8 shadow-soft transition-transform duration-300 hover:-translate-y-0.5 sm:p-10 lg:mx-auto lg:max-w-[600px]">
            <div className="h-[500px] w-full overflow-hidden rounded-[2.5rem] sm:h-[600px] lg:h-[700px]">
              <Image
                src="/founder/founder.jpg"
                alt={fi ? 'Suklaamon leipuri kotikeittiössä Oulussa' : "The baker at Suklaamo's home kitchen in Oulu, Finland"}
                width={1200}
                height={1000}
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-accent-cocoa">{fi ? 'Tapaa leipuri' : 'Meet the baker'}</p>
            <h1 className="text-4xl font-black leading-tight text-primary sm:text-5xl">
              {fi ? 'Kotileipuri, joka rakastaa suklaata, kahvia ja ihmisiä, joiden kanssa herkut jaetaan.' : 'A home baker who loves chocolate, coffee and the people who share the treats.'}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[#5a4030] sm:text-lg">
              {fi ? 'Aloin leipoa, koska halusin pitkän päivän jälkeen vielä yhden makean palan. Siitä tuli tapa: hyvää suklaata, rauhallinen keittiö ja ilo tehdä jotain toiselle.' : 'I started baking because I wanted one more sweet thing after a long day. It turned into a habit. good chocolate, a quiet kitchen and the joy of making something for someone else.'}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-white p-6 shadow-soft">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{fi ? 'Ensin kahvi' : 'Coffee first'}</p>
                <p className="mt-3 text-sm leading-7 text-[#5a4030]">{fi ? 'Useimmat päivät alkavat vahvalla kahvilla ja katsauksella siihen, mitä uuni leipoo seuraavaksi.' : 'Most days begin with a strong coffee and a look at what the oven will bake next.'}</p>
              </div>
              <div className="rounded-[2rem] bg-[#fff3e0] p-6 shadow-soft">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{fi ? 'Suklaan ystävä' : 'Chocolate lover'}</p>
                <p className="mt-3 text-sm leading-7 text-[#5a4030]">{fi ? 'Hyvä suklaa on jokaisen leivonnaisen sydän, brownieista keksirasioihin.' : 'Good chocolate is the heart of every bake here, from brownies to cookie boxes.'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[3rem] bg-[#fff4df] p-10 shadow-soft">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <SectionHeading title={fi ? 'Tarina keittiöstä' : 'A story from the kitchen'} subtitle={fi ? 'Näin Suklaamo löysi rytminsä.' : 'How Suklaamo found its rhythm.'} />
              <p className="mt-6 text-base leading-7 text-[#5a4030]">
                {fi ? 'Aluksi tein vain erän brownieita ystävälle. Seuraavana päivänä tein lisää jaettavaksi naapureille, ja se tuntui oikealta. Keittiöstä tuli rauhallisten iltojen, lämpimän suklaan ja pienten, rehellisten tilausten paikka.' : 'At first it was just a batch of brownies for a friend. The next day I made more to share with neighbours, and it felt right. The kitchen became a place for quiet evenings, warm chocolate and small, honest orders.'}
              </p>
              <p className="mt-5 text-base leading-7 text-[#5a4030]">
                {fi ? 'Tämä on hidas keittiö. Kirjoitan muistiinpanot jokaiseen tilaukseen, pidän uunin lämpötilan tasaisena ja pakkaan jokaisen rasian rauhallisen ja tutun näköiseksi.' : 'It is a slow kitchen. I write notes for every order, keep the oven temperature steady and package each box so it arrives looking calm and familiar.'}
              </p>
            </div>
            <div className="space-y-4 rounded-[2.5rem] bg-white p-8 shadow-soft transition-transform duration-300 hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-accent-berry" />
                <div>
                  <p className="text-sm font-semibold text-primary">{fi ? 'Ensimmäiset tilaukset olivat ystäville.' : 'First orders were for friends.'}</p>
                  <p className="mt-2 text-sm leading-7 text-[#5a4030]">{fi ? 'Erä brownieita ja muutama keksi muuttuivat pieneksi viikoittaiseksi rutiiniksi.' : 'A batch of brownies and a few cookies turned into a small weekly routine.'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-accent-sage" />
                <div>
                  <p className="text-sm font-semibold text-primary">{fi ? 'Jokainen resepti on pelkistetty.' : 'Every recipe is pared back.'}</p>
                  <p className="mt-2 text-sm leading-7 text-[#5a4030]">{fi ? 'Ei turhaa hienostelua. Vain hyviä raaka-aineita ja kodilta tuntuva keittiö.' : 'There is no fuss. Just good ingredients and a kitchen that feels like home.'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-accent-gold" />
                <div>
                  <p className="text-sm font-semibold text-primary">{fi ? 'Leivon hetkiä, en trendejä varten.' : 'I bake for moments, not trends.'}</p>
                  <p className="mt-2 text-sm leading-7 text-[#5a4030]">{fi ? 'Pienet kakut, keksirasiat ja browniet syntyvät syntymäpäiviin, kahvitauoille ja arjen herkkuhetkiin.' : 'Small cakes, cookie boxes and brownies are made for birthdays, coffee breaks and everyday treats.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div>
            <SectionHeading title={fi ? 'Perustajan tervehdys' : "A founder's note"} subtitle={fi ? 'Yksinkertainen katsaus leivontaani.' : 'A simple view of how I bake.'} />
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[3rem] bg-white p-10 shadow-soft">
              <p className="text-base leading-7 text-[#5a4030]">
                {fi ? 'Leivon iltaisin ja rauhallisina aamuina. Keittiössä kokeilen uusia keksi-ideoita, viimeistelen brownie-erän ja pakkaan tilaukset pienen viestin kera. Kaikki on pientä, mutta haluan jokaisen rasian tuntuvan lämpimältä lahjalta.' : 'I bake in the evenings and on slow mornings. The kitchen is where I test new cookie ideas, finish a batch of brownies and wrap orders with a little note. It is all very small, but I want every box to feel like a warm gift.'}
              </p>
              <p className="mt-6 text-base leading-7 text-[#5a4030]">
                {fi ? 'Parasta on kuulla, että herkut tekivät jonkun kahvista paremman tai perhejuhlasta makeamman. Se pitää tämän pienen leipomon liikkeessä.' : 'The best part is hearing that the treats made someone’s coffee better or a family gathering sweeter. That is what keeps this little bakery going.'}
              </p>
            </div>
            <div className="rounded-[3rem] bg-[#f4e2d0] p-10 shadow-soft transition-transform duration-300 hover:-translate-y-0.5">
              {/* <p className="text-sm uppercase tracking-[0.35em] text-accent-cocoa">Founder quote</p> */}
              <p className="mt-2 text-3xl font-black leading-tight text-primary sm:text-4xl">
                {fi ? '“Leivonta on tapani osoittaa rakkautta. Mikään ei tuota suurempaa iloa kuin tuoreen kotitekoisen herkun jakaminen läheisteni kanssa.”' : '“Baking is my love language. There is no greater joy than sharing a yummy homemade treat fresh from my kitchen, with my loved ones.”'}
              </p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading title={fi ? 'Mikä keittiössämme on tärkeää' : 'What matters in our kitchen'} subtitle={fi ? 'Yksinkertaiset asiat, joista en tingi.' : 'The simple things I never compromise on.'} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {kitchenValues.map((item) => (
              <div key={item.title} className="rounded-[2rem] bg-white p-7 shadow-soft">
                <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#5a4030]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-4 flex justify-center">
          <Link
            href="/catalogue"
            className="inline-flex rounded-full bg-accent-gold px-7 py-3 text-sm font-semibold text-primary shadow-soft transition hover:bg-[#d59b38]"
          >
            {fi ? 'Selaa koko valikoimaa' : 'Browse the full catalogue'}
          </Link>
        </div>

        <section>
          <SectionHeading title={fi ? 'Kuvagalleria' : 'Photo gallery'} subtitle={fi ? 'Vaihtuva näkymä keittiöön ja herkkuihin.' : 'A rolling view of the kitchen and treats.'} />
          <div className="mt-8">
            <PhotoMarquee />
          </div>
        </section>
      </section>

      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ])}
      />
      <Footer />
    </main>
  );
}
