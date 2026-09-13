import { scoreTier, scoreTierLabel } from "../types/resume";

interface ScoreCardProps {
  label: string;
  score: number;
  accent: "blue" | "indigo";
}

const TIER_COLOR: Record<string, string> = {
  excellent: "#10B981",
  good: "#2563EB",
  "needs-improvement": "#F59E0B",
  poor: "#EF4444",
};

export default function ScoreCard({ label, score, accent }: ScoreCardProps) {
  const tier = scoreTier(score);
  const ringColor = TIER_COLOR[tier];
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-5 rounded-2xl border border-ink-900/[0.08] bg-white p-6 shadow-soft">
      <div className="relative h-24 w-24 flex-none">
        <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F5F9" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={ringColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-ink-900">{score}</span>
          <span className="text-[10px] font-medium text-ink-300">/100</span>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-300">{label}</p>
        <p
          className="mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{ color: ringColor, backgroundColor: `${ringColor}14` }}
        >
          {scoreTierLabel[tier]}
        </p>
        <p className="mt-2 text-[11px] text-ink-300">
          {accent === "blue" ? "Overall resume quality" : "Applicant-tracking-system readability"}
        </p>
      </div>
    </div>
  );
}
