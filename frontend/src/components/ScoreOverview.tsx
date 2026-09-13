import ScoreCard from "./ScoreCard";
import type { ResumeAnalysis } from "../types/resume";

interface ScoreOverviewProps {
  analysis: ResumeAnalysis;
}

export default function ScoreOverview({ analysis }: ScoreOverviewProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ScoreCard label="Overall score" score={analysis.overall_score} accent="blue" />
      <ScoreCard label="ATS compatibility" score={analysis.ats_score} accent="indigo" />
    </div>
  );
}
