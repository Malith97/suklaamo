'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background text-text-dark">
      <section className="container mx-auto py-24 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-accent-cocoa">Something went wrong</p>
        <h1 className="mt-4 text-5xl font-black text-primary">Oops, an error occurred</h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#5a4030]">
          We&apos;re sorry for the interruption. Please refresh the page or return home to continue exploring Suklaamo.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button type="button" onClick={reset} className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-[#4e2b15]">
            Try again
          </button>
          <Link href="/" className="inline-flex rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-primary shadow-soft hover:bg-[#fff5df]">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
