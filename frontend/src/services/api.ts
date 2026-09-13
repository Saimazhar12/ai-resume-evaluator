import type { AnalyzeResponse, ApiErrorBody, ChatMessage, ChatResponse, ResumeAnalysis } from "../types/resume";

/**
 * Base URL of the Flask backend. Configure via VITE_API_URL in a .env file
 * (see .env.example). Defaults to the Flask dev server on port 5000.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function parseErrorOrThrow(res: Response): Promise<never> {
  let message = `Request failed with status ${res.status}`;
  try {
    const body = (await res.json()) as ApiErrorBody;
    if (body?.error) message = body.error;
  } catch {
    // response wasn't JSON - keep default message
  }
  throw new ApiError(message, res.status);
}

/**
 * POST /api/analyze
 * multipart/form-data: resume (file), job_description (optional string)
 */
export async function analyzeResume(
  file: File,
  jobDescription: string
): Promise<AnalyzeResponse> {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("job_description", jobDescription);

  const res = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) await parseErrorOrThrow(res);
  return (await res.json()) as AnalyzeResponse;
}

/**
 * POST /api/chat
 * json: { resume_text, analysis_summary, chat_history, question, job_description, analysis_details }
 */
export async function askAboutResume(
  resumeText: string,
  analysisSummary: string,
  chatHistory: ChatMessage[],
  question: string,
  jobDescription: string,
  analysisDetails: ResumeAnalysis | null
): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      resume_text: resumeText,
      analysis_summary: analysisSummary,
      chat_history: chatHistory,
      question,
      job_description: jobDescription,
      analysis_details: analysisDetails,
    }),
  });

  if (!res.ok) await parseErrorOrThrow(res);
  return (await res.json()) as ChatResponse;
}
