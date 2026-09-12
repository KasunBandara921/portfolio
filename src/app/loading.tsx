export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-background)]">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Outer glowing spinner ring */}
        <div className="w-16 h-16 rounded-full border-2 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] animate-spin" />
        {/* Inner pulsing core */}
        <div className="absolute w-6 h-6 rounded-full bg-[var(--color-primary)]/40 animate-ping" />
      </div>
      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] animate-pulse">
        Loading...
      </p>
    </div>
  );
}
