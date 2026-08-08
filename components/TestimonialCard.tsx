export default function TestimonialCard({ quote, name }: { quote: string; name: string }) {
  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-soft">
      <p className="text-lg leading-8 text-[#3a2317]">“{quote}”</p>
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">— {name}</p>
    </div>
  );
}
