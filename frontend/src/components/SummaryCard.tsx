import { Sparkles } from "lucide-react";

interface SummaryCardProps {
  summary: string;
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-ink-900/[0.08] bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">
          <Sparkles size={14} className="text-brand-indigo" strokeWidth={2.2} />
        </div>
        <h3 className="font-display text-base font-bold text-ink-900">AI resume summary</h3>
      </div>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-700">{summary}</p>
    </div>
  );
}
