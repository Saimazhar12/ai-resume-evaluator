import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  onAnalyzeClick: () => void;
}

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "ATS Checker", href: "#upload" },
];

export default function Navbar({ onAnalyzeClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/[0.06] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2">
          <Logo size={30} />
          <span className="hidden rounded-full bg-brand-indigo/10 px-2 py-0.5 text-[11px] font-medium text-brand-indigo sm:inline-flex items-center gap-1">
            <Sparkles size={11} strokeWidth={2.5} />
            AI-Powered
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-500 transition-colors hover:text-ink-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <button
            onClick={onAnalyzeClick}
            className="rounded-xl bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-blue hover:shadow-soft"
          >
            Analyze Resume
          </button>
        </div>

        <button
          className="flex items-center justify-center rounded-lg p-2 text-ink-700 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-ink-900/[0.06] bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-900/[0.04]"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                onAnalyzeClick();
              }}
              className="mt-2 rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Analyze Resume
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
