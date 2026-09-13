import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-red-100 bg-red-50/60 p-8 text-center" role="alert">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
        <AlertTriangle size={19} className="text-red-500" />
      </div>
      <p className="mt-3 font-display text-base font-bold text-ink-900">Something went wrong</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-ink-500">{message}</p>
      <button
        onClick={onRetry}
        className="mt-5 rounded-xl bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
      >
        Retry
      </button>
    </div>
  );
}
