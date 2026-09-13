import { Plus } from "lucide-react";
import type { SkillGap } from "../types/resume";

interface SkillsSectionProps {
  matchedSkills: string[];
  missingSkills: SkillGap[];
}

export default function SkillsSection({ matchedSkills, missingSkills }: SkillsSectionProps) {
  return (
    <div className="rounded-2xl border border-ink-900/[0.08] bg-white p-6 shadow-soft">
      <h3 className="font-display text-base font-bold text-ink-900">Skills analysis</h3>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Skills found</p>
        {matchedSkills.length === 0 ? (
          <p className="mt-2 text-sm text-ink-300">No strong skill matches were found.</p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {matchedSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-indigo">Skills worth adding</p>
        {missingSkills.length === 0 ? (
          <p className="mt-2 text-sm text-ink-300">No critical skill gaps were found — nice work.</p>
        ) : (
          <div className="mt-3 space-y-2.5">
            {missingSkills.map((gap) => (
              <div
                key={gap.skill}
                className="flex items-start gap-2.5 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3"
              >
                <Plus size={15} className="mt-0.5 flex-none text-brand-indigo" strokeWidth={2.4} />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{gap.skill}</p>
                  <p className="text-sm text-ink-500">{gap.reason}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
