export default function CategoryPill({ label, count }: { label: string; count: number }) {
  return (
    <span className="inline-flex rounded-full bg-[#fff1dc] px-4 py-2 text-sm font-semibold text-primary shadow-soft">
      {label} · {count}
    </span>
  );
}
