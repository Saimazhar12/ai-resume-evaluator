import Logo from "./Logo";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-900/[0.12] bg-white/60 px-8 py-16 text-center">
      <Logo size={40} showWordmark={false} />
      <p className="mt-4 font-display text-base font-bold text-ink-900">AI resume analysis</p>
      <p className="mt-1 max-w-xs text-sm text-ink-500">
        Upload your resume to unlock your personalized analysis.
      </p>
    </div>
  );
}
