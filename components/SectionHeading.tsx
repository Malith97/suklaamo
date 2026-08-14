import type { ElementType } from 'react';

export default function SectionHeading({
  title,
  subtitle,
  as = 'h2',
}: {
  title: string;
  subtitle?: string;
  as?: ElementType;
}) {
  const Tag = as;
  return (
    <div className="space-y-3">
      <Tag className="text-3xl font-black uppercase tracking-[0.2em] text-primary sm:text-4xl">{title}</Tag>
      {subtitle ? <p className="max-w-2xl text-sm leading-7 text-[#493620]">{subtitle}</p> : null}
    </div>
  );
}
