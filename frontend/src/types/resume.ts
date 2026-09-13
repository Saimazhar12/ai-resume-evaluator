/**
 * These types mirror the Flask backend's response shapes exactly.
 * See: resume-analyzer-flask/analyzer/chain.py (ResumeAnalysis, SkillGap)
 * and app.py (/api/analyze, /api/chat).
 */

export interface SkillGap {
  skill: string;
  reason: string;
}

export interface ResumeAnalysis {
  overall_score: number;
  ats_score: number;
  summary: string;
  matched_skills: string[];
  missing_skills: SkillGap[];
  structure_feedback: string[];
  strengths: string[];
  improvement_suggestions: string[];
}

export interface AnalyzeResponse {
  resume_text: string;
  analysis: ResumeAnalysis;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  answer: string;
}

export interface ApiErrorBody {
  error: string;
}

export type ScoreTier = "excellent" | "good" | "needs-improvement" | "poor";

export function scoreTier(score: number): ScoreTier {
  if (score >= 85) return "excellent";
  if (score >= 70) return "good";
  if (score >= 50) return "needs-improvement";
  return "poor";
}

export const scoreTierLabel: Record<ScoreTier, string> = {
  excellent: "Excellent",
  good: "Good",
  "needs-improvement": "Needs improvement",
  poor: "Poor",
};
