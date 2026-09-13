import { useState, useRef, useEffect } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { askAboutResume, ApiError } from "../services/api";
import type { ChatMessage, ResumeAnalysis } from "../types/resume";

interface AskAIProps {
  resumeText: string;
  analysisSummary: string;
  jobDescription: string;
  analysisDetails: ResumeAnalysis | null;
}

export default function AskAI({ resumeText, analysisSummary, jobDescription, analysisDetails }: AskAIProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [error, setError] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || isAsking) return;

    const nextHistory: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextHistory);
    setQuestion("");
    setError("");
    setIsAsking(true);

    try {
      const res = await askAboutResume(resumeText, analysisSummary, messages, trimmed, jobDescription, analysisDetails);
      setMessages([...nextHistory, { role: "assistant", content: res.answer }]);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't get a reply. Please try again.");
    } finally {
      setIsAsking(false);
    }
  }

  return (
    <div className="rounded-2xl border border-ink-900/[0.08] bg-gradient-to-br from-brand-blue to-brand-indigo p-6 text-white shadow-glow">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
          <Sparkles size={15} strokeWidth={2.2} />
        </div>
        <h3 className="font-display text-base font-bold">Have a question about your resume?</h3>
      </div>
      <p className="mt-1 text-sm text-white/80">Ask AI for personalized advice based on your resume.</p>

      {messages.length > 0 && (
        <div ref={threadRef} className="mt-4 max-h-72 space-y-2.5 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user" ? "ml-auto bg-white/20 text-white" : "bg-white text-ink-900"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <label htmlFor="ask-ai-input" className="sr-only">
          Ask a question about your resume
        </label>
        <input
          id="ask-ai-input"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. How should I describe my latest role?"
          className="min-w-0 flex-1 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:border-white/60 focus:bg-white/15 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isAsking || !question.trim()}
          className="flex flex-none items-center gap-1.5 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-brand-indigo transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
        >
          {isAsking ? <Loader2 size={15} className="animate-spin" /> : <>Ask AI →</>}
        </button>
      </form>

      {error && <p className="mt-2 text-xs font-medium text-red-100">{error}</p>}
    </div>
  );
}
