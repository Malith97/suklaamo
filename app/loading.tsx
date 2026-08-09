export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-text-dark">
      <div className="container mx-auto py-16">
        <div className="space-y-10 animate-pulse">
          <div className="h-14 w-2/5 rounded-[2rem] bg-surface" />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-4 rounded-[2.5rem] border border-border bg-[#fff6ed] p-6 shadow-soft">
                <div className="h-72 rounded-[2rem] bg-[#f3e5d4]" />
                <div className="space-y-3">
                  <div className="h-6 w-3/4 rounded-full bg-surface" />
                  <div className="h-4 w-2/3 rounded-full bg-surface" />
                  <div className="h-4 w-1/2 rounded-full bg-surface" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
