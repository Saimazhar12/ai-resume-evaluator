import Logo from "./Logo";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "ATS Analysis", href: "#upload" },
  { label: "Resume Review", href: "#upload" },
  { label: "AI Advice", href: "#upload" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-900/[0.06] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo size={28} />
          <p className="mt-3 text-sm leading-relaxed text-ink-500">
            AI-powered resume analysis and career insights.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-ink-500 hover:text-ink-900">
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-ink-900/[0.06] px-5 py-5 text-center text-xs text-ink-300 sm:px-8">
        © 2026 ResumeAI. Not affiliated with any resume board or job platform.
      </div>
    </footer>
  );
}
