interface ImprovementTimelineProps {
  suggestions: string[];
}

export default function ImprovementTimeline({ suggestions }: ImprovementTimelineProps) {
  return (
    <div className="rounded-2xl border border-ink-900/[0.08] bg-white p-6 shadow-soft">
      <h3 className="font-display text-base font-bold text-ink-900">Your improvement plan</h3>
      <p className="mt-1 text-sm text-ink-500">Actionable changes that can make your resume stronger.</p>

      {suggestions.length === 0 ? (
        <p className="mt-4 text-sm text-ink-300">No further suggestions — this resume is in great shape.</p>
      ) : (
        <ol className="relative mt-5 space-y-6 border-l border-ink-900/[0.08] pl-6">
          {suggestions.map((item, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand-indigo bg-white text-[11px] font-bold text-brand-indigo">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-ink-700">{item}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
