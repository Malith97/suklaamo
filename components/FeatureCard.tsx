import type { ReactNode } from 'react';

export default function FeatureCard({ title, description, accent }: { title: string; description: string; accent: 'gold' | 'cocoa' | 'berry' | 'sage'; }) {
  const colors = {
    gold: 'bg-accent-gold/10 border-accent-gold text-primary',
    cocoa: 'bg-accent-cocoa/10 border-accent-cocoa text-primary',
    berry: 'bg-accent-berry/10 border-accent-berry text-primary',
    sage: 'bg-accent-sage/10 border-accent-sage text-primary',
  };

  return (
    <div className={`rounded-[2.5rem] border p-6 shadow-soft ${colors[accent]}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.35em]">{title}</p>
      <p className="mt-4 text-sm leading-7 text-[#5a4030]">{description}</p>
    </div>
  );
}
