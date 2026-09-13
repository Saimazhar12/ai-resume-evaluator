import { Loader2, Check } from "lucide-react";

/**
 * The Flask backend does a single synchronous analysis call and doesn't
 * report granular progress, so these steps are a visual pacing device only —
 * they advance on a timer, not on real backend events. None of them claim a
 * step has actually completed on the server.
 */
const STEPS = ["Reading resume", "Checking structure", "Analyzing skills", "Calculating ATS compatibility", "Generating recommendations"];

import { useEffect, useState } from "react";

export default function LoadingState() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-ink-900/[0.08] bg-white p-10 text-center shadow-soft">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-50">
        <Loader2 size={22} className="animate-spin text-brand-indigo" />
      </div>
      <p className="mt-4 font-display text-base font-bold text-ink-900">Analyzing your resume…</p>
      <p className="mt-1 text-sm text-ink-500">This usually takes a few seconds.</p>

      <ul className="mx-auto mt-6 max-w-xs space-y-2.5 text-left">
        {STEPS.map((step, i) => (
          <li key={step} className="flex items-center gap-2.5 text-sm">
            {i < activeStep ? (
              <Check size={15} className="flex-none text-emerald-600" />
            ) : i === activeStep ? (
              <Loader2 size={15} className="flex-none animate-spin text-brand-indigo" />
            ) : (
              <span className="h-3.5 w-3.5 flex-none rounded-full border-2 border-ink-900/[0.12]" />
            )}
            <span className={i <= activeStep ? "text-ink-900" : "text-ink-300"}>{step}</span>
          </li>
        ))}
      </ul>

      {/* skeleton preview of the report about to appear */}
      <div className="mx-auto mt-8 max-w-sm space-y-2">
        <div className="h-3 w-3/4 rounded shimmer-bg animate-shimmer" />
        <div className="h-3 w-full rounded shimmer-bg animate-shimmer" />
        <div className="h-3 w-5/6 rounded shimmer-bg animate-shimmer" />
      </div>
    </div>
  );
}
