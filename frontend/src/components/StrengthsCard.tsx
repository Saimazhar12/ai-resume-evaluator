import { CheckCircle2 } from "lucide-react";

interface StrengthsCardProps {
  strengths: string[];
}

export default function StrengthsCard({ strengths }: StrengthsCardProps) {
  return (
    <div className="rounded-2xl border border-ink-900/[0.08] bg-white p-6 shadow-soft">
      <h3 className="font-display text-base font-bold text-ink-900">What's working</h3>

      {strengths.length === 0 ? (
        <p className="mt-3 text-sm text-ink-300">No standout strengths were identified.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {strengths.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 rounded-xl bg-emerald-50/60 p-3">
              <CheckCircle2 size={16} className="mt-0.5 flex-none text-emerald-600" />
              <span className="text-sm leading-relaxed text-ink-700">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
