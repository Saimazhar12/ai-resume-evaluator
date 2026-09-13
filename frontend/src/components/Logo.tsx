interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

/**
 * Original abstract mark for ResumeAI: a folded document silhouette with a
 * checkmark (analysis complete) and a small spark (AI) at the folded corner.
 * Pure inline SVG so it stays sharp at any size (24-48px+).
 */
export default function Logo({ size = 32, showWordmark = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="url(#resumeai-mark-gradient)" />
        <path
          d="M10 8.5C10 7.67157 10.6716 7 11.5 7H18L22 11V23.5C22 24.3284 21.3284 25 20.5 25H11.5C10.6716 25 10 24.3284 10 23.5V8.5Z"
          fill="white"
          fillOpacity="0.96"
        />
        <path d="M18 7L22 11H18V7Z" fill="white" fillOpacity="0.55" />
        <path
          d="M12.8 15.6L14.7 17.5L18.6 12.8"
          stroke="#4F46E5"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12.8 20.2H18.2" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="resumeai-mark-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
        </defs>
      </svg>

      {showWordmark && (
        <span className="font-display font-bold text-ink-900 tracking-tight" style={{ fontSize: size * 0.55 }}>
          ResumeAI
        </span>
      )}
    </div>
  );
}
