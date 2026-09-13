interface FormattingCardProps {
  feedback: string[];
}

export default function FormattingCard({ feedback }: FormattingCardProps) {
  return (
    <div className="rounded-2xl border border-ink-900/[0.08] bg-white p-6 shadow-soft">
      <h3 className="font-display text-base font-bold text-ink-900">Structure &amp; formatting</h3>

      {feedback.length === 0 ? (
        <p className="mt-3 text-sm text-ink-300">No structural issues were flagged.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {feedback.map((item, i) => (
            <li key={i} className="flex gap-3 border-b border-ink-900/[0.05] pb-3 last:border-0 last:pb-0">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-md bg-ink-900/[0.04] text-[11px] font-bold text-ink-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-ink-700">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
