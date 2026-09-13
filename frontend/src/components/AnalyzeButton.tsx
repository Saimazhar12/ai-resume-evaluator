import { Sparkles, Loader2 } from "lucide-react";

interface AnalyzeButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export default function AnalyzeButton({ onClick, isLoading, disabled }: AnalyzeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-indigo px-6 py-4 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
    >
      {isLoading ? (
        <>
          <Loader2 size={17} className="animate-spin" />
          Analyzing your resume…
        </>
      ) : (
        <>
          <Sparkles size={16} strokeWidth={2.4} />
          Analyze my resume
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </>
      )}
    </button>
  );
}
