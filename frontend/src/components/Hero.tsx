import { Sparkles, ShieldCheck, Zap } from "lucide-react";

interface HeroProps {
  onCtaClick: () => void;
}

const BADGES = [
  { icon: Sparkles, label: "AI-Powered Analysis" },
  { icon: ShieldCheck, label: "ATS Optimization" },
  { icon: Zap, label: "Instant Feedback" },
];

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* subtle gradient glow, decorative only */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.15] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #6366F1, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl">
            Turn your resume into your next opportunity
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-500">
            Get an AI-powered resume review with ATS scoring, skill analysis, and
            actionable improvements.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {BADGES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/[0.08] bg-white px-3 py-1.5 text-xs font-medium text-ink-700 shadow-soft"
              >
                <Icon size={13} className="text-brand-indigo" strokeWidth={2.4} />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={onCtaClick}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-indigo px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Analyze my resume
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
            <span className="text-sm text-ink-300">No sign-up needed to try it</span>
          </div>
        </div>

        {/* Decorative dashboard preview - static example values, not real analysis data */}
        <div className="relative hidden lg:block" aria-hidden="true">
          <div className="rounded-2xl border border-ink-900/[0.07] bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-500">Resume Analysis</span>
              <span className="rounded-full bg-brand-indigo/10 px-2 py-0.5 text-[10px] font-medium text-brand-indigo">
                Preview
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-ink-900/[0.06] bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                <p className="text-2xl font-bold text-ink-900">88<span className="text-sm font-medium text-ink-300">/100</span></p>
                <p className="mt-1 text-xs font-medium text-ink-500">Overall Score</p>
              </div>
              <div className="rounded-xl border border-ink-900/[0.06] bg-gradient-to-br from-indigo-50 to-violet-50 p-4">
                <p className="text-2xl font-bold text-ink-900">85<span className="text-sm font-medium text-ink-300">/100</span></p>
                <p className="mt-1 text-xs font-medium text-ink-500">ATS Score</p>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-ink-900/[0.06] p-4">
              <p className="text-xs font-medium text-ink-500">Skills Found</p>
              <p className="mt-1 text-2xl font-bold text-ink-900">16</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Python", "SQL", "LangChain", "React"].map((s) => (
                  <span key={s} className="rounded-full bg-ink-900/[0.04] px-2.5 py-1 text-[11px] font-medium text-ink-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
