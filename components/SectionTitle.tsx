export default function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="space-y-4">
      <p className="text-sm uppercase tracking-[0.35em] text-accent-cocoa/90">{subtitle}</p>
      <h2 className="text-3xl font-black tracking-[-0.04em] text-primary sm:text-4xl">{title}</h2>
    </div>
  );
}
