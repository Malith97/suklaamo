export default function Badge({ label, variant = 'cocoa' }: { label: string; variant?: 'cocoa' | 'berry' | 'sage' }) {
  const colors = {
    cocoa: 'bg-accent-cocoa text-white',
    berry: 'bg-accent-berry text-white',
    sage: 'bg-accent-sage text-white',
  };

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${colors[variant]}`}>{label}</span>;
}
