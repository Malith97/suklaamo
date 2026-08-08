export default function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-black uppercase tracking-[0.2em] text-primary sm:text-4xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-sm leading-7 text-[#493620]">{subtitle}</p> : null}
    </div>
  );
}
