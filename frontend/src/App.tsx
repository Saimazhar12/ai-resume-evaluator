import { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ResumeUploader from "./components/ResumeUploader";
import JobDescriptionInput from "./components/JobDescriptionInput";
import AnalyzeButton from "./components/AnalyzeButton";
import ScoreOverview from "./components/ScoreOverview";
import SummaryCard from "./components/SummaryCard";
import StrengthsCard from "./components/StrengthsCard";
import FormattingCard from "./components/FormattingCard";
import SkillsSection from "./components/SkillsSection";
import ImprovementTimeline from "./components/ImprovementTimeline";
import AskAI from "./components/AskAI";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";
import Footer from "./components/Footer";
import { analyzeResume, ApiError } from "./services/api";
import type { ResumeAnalysis } from "./types/resume";

type Status = "idle" | "loading" | "success" | "error";

const HOW_IT_WORKS = [
  { title: "Upload your resume", detail: "PDF or DOCX, straight from your computer." },
  { title: "Add a target role", detail: "Optionally paste a job description for a tailored match." },
  { title: "Get your report", detail: "Scores, skill gaps, and a concrete improvement plan." },
];

const FEATURES = [
  { title: "ATS compatibility scoring", detail: "See how a tracking system is likely to parse your resume before a recruiter ever does." },
  { title: "Skill gap detection", detail: "Know exactly which skills to add or emphasize for the role you're targeting." },
  { title: "Structured improvement plan", detail: "Specific, ordered suggestions instead of generic resume advice." },
];

export default function App() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [resumeText, setResumeText] = useState("");

  const uploadSectionRef = useRef<HTMLDivElement>(null);

  function scrollToUpload() {
    uploadSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleAnalyze() {
    if (!resumeFile) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await analyzeResume(resumeFile, jobDescription);
      setAnalysis(res.analysis);
      setResumeText(res.resume_text);
      setStatus("success");
    } catch (err) {
      setErrorMessage(err instanceof ApiError ? err.message : "Unexpected error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAnalyzeClick={scrollToUpload} />
      <Hero onCtaClick={scrollToUpload} />

      <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-2xl font-bold text-ink-900">How it works</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.title} className="rounded-2xl border border-ink-900/[0.08] bg-white p-6 shadow-soft">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900/[0.04] text-xs font-bold text-ink-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-sm font-semibold text-ink-900">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-2xl font-bold text-ink-900">Features</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-ink-900/[0.08] bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-6">
              <p className="text-sm font-semibold text-ink-900">{f.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={uploadSectionRef} id="upload" className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[380px_1fr] lg:items-start">
          {/* Intake column */}
          <div className="space-y-5 lg:sticky lg:top-24">
            <ResumeUploader
              file={resumeFile}
              onFileSelected={(f) => {
                setResumeFile(f);
                if (status === "error") setStatus("idle");
              }}
              onFileRemoved={() => {
                setResumeFile(null);
                setStatus("idle");
                setAnalysis(null);
              }}
            />
            <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
            <AnalyzeButton onClick={handleAnalyze} isLoading={status === "loading"} disabled={!resumeFile} />
          </div>

          {/* Report column */}
          <div>
            {status === "idle" && <EmptyState />}
            {status === "loading" && <LoadingState />}
            {status === "error" && <ErrorState message={errorMessage} onRetry={handleAnalyze} />}

            {status === "success" && analysis && (
              <div className="space-y-5 animate-fadeUp">
                <ScoreOverview analysis={analysis} />
                <SummaryCard summary={analysis.summary} />

                <div className="grid gap-5 md:grid-cols-2">
                  <StrengthsCard strengths={analysis.strengths} />
                  <FormattingCard feedback={analysis.structure_feedback} />
                </div>

                <SkillsSection matchedSkills={analysis.matched_skills} missingSkills={analysis.missing_skills} />
                <ImprovementTimeline suggestions={analysis.improvement_suggestions} />
                <AskAI
                  resumeText={resumeText}
                  analysisSummary={analysis.summary}
                  jobDescription={jobDescription}
                  analysisDetails={analysis}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
