interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX_CHARS = 4000;

export default function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
  return (
    <div className="rounded-2xl border border-ink-900/[0.08] bg-white p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <h3 className="font-display text-base font-bold text-ink-900">Target job description</h3>
        <span className="rounded-full bg-ink-900/[0.05] px-2 py-0.5 text-[11px] font-medium text-ink-500">
          Optional
        </span>
      </div>
      <p className="mt-1 text-sm text-ink-500">
        Paste the job description to get a more accurate skill match and ATS analysis.
      </p>

      <label htmlFor="job-description" className="sr-only">
        Target job description
      </label>
      <textarea
        id="job-description"
        rows={7}
        maxLength={MAX_CHARS}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description you're applying to…"
        className="mt-4 w-full resize-y rounded-xl border border-ink-900/[0.1] bg-ink-900/[0.015] px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 transition-colors focus:border-brand-indigo focus:bg-white focus:outline-none"
      />
      <p className="mt-2 text-right text-xs text-ink-300">
        {value.length}/{MAX_CHARS}
      </p>
    </div>
  );
}
