import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    "Sorry, the page you're looking for doesn't exist at Suklaamo. Return to our home or browse our chocolate treats made in Oulu, Finland.",
  alternates: {
    canonical: '/404',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-text-dark">
      <section className="container mx-auto py-24 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-accent-cocoa">Page missing</p>
        <h1 className="mt-4 text-5xl font-black text-primary">This page can&apos;t be found</h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#5a4030]">
          Sorry, we couldn&apos;t find the page you were looking for. Use the menu to continue browsing our chocolate treats and bakery story.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="inline-flex rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#d38a24]">
            Back to home
          </Link>
          <Link href="/catalogue" className="inline-flex rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-primary shadow-soft hover:bg-[#fff5df]">
            Browse catalogue
          </Link>
        </div>
      </section>
    </main>
  );
}
