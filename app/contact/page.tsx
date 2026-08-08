import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-text-dark">
      <Navbar />
      <section className="container mx-auto py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[3rem] bg-white p-8 shadow-soft sm:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Get in touch</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Reserve your handcrafted chocolate treats for pickup in Oulu.</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5a4030] sm:text-base">
              Send your request through the form, Instagram, Whatsapp or email. We’ll reply quickly and help you reserve a pickup slot for fresh baked goods from our home kitchen.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2.5rem] bg-[#fff4dd] p-6 shadow-soft">
                <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">Pickup location</p>
                <p className="mt-2 text-sm leading-7 text-[#5a4030]">Peltolankaari 20, 90230, Oulu, Finland</p>
              </div>
              <div className="rounded-[2.5rem] bg-[#fff4dd] p-6 shadow-soft">
                <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">Pickup hours</p>
                <p className="mt-2 text-sm leading-7 text-[#5a4030]">Fri 17:00–21:00 · Sat-Sunday 16:00–20:00</p>
              </div>
            </div>

            <div className="mt-10 rounded-[3rem] bg-[#fff8e8] p-8 shadow-soft">
              <p className="text-sm uppercase font-black tracking-[0.35em] text-primary">Order note</p>
              <p className="mt-2 text-sm leading-7 text-[#5a4030]">
                Checkout is not available yet. Use the form below or DM us on Instagram/Whatsapp and we’ll confirm your order with a pickup window that works for you.
              </p>
            </div>

            <div className="mt-10 rounded-[3rem] bg-white p-8 shadow-soft">
              <form className="space-y-6">
                <label className="block text-sm font-semibold text-primary">
                  Name
                  <input name="name" type="text" placeholder="Your name" className="mt-3 w-full" />
                </label>
                <label className="block text-sm font-semibold text-primary">
                  Email
                  <input name="email" type="email" placeholder="you@example.com" className="mt-3 w-full" />
                </label>
                <label className="block text-sm font-semibold text-primary">
                  What do you want?
                  <textarea name="message" rows={5} placeholder="Tell us what you need" className="mt-3 w-full"></textarea>
                </label>
                <button type="submit" className="rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#d38a24]">
                  Send request
                </button>
              </form>
            </div>
          </div>

          <aside className="space-y-8 rounded-[3rem] bg-[#fff4dd] p-8 shadow-soft">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-primary">Instagram</p>
              <a href="https://instagram.com/suklaamoo" target="_blank" rel="noreferrer" className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#2d180f]">
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
      </section>
      <Footer />
    </main>
  );
}
