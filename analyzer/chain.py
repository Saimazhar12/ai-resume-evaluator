"""
LangChain + Gemini powered resume analysis.

Uses ChatGoogleGenerativeAI's structured-output mode (function calling under
the hood) so the LLM's response is parsed straight into a validated Pydantic
object - no brittle string parsing of the model's reply.
"""
from __future__ import annotations

import os
from typing import List, Optional

from pydantic import BaseModel, Field
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

MAX_RESUME_CHARS = 12000  # keep prompts/costs bounded


# ---------------------------------------------------------------------------
# Structured output schema - this shapes exactly what the LLM must return.
# ---------------------------------------------------------------------------
class SkillGap(BaseModel):
    skill: str = Field(description="A specific skill, tool, or technology")
    reason: str = Field(
        description="Why it matters for this resume / job description, in one short sentence"
    )


class ResumeAnalysis(BaseModel):
    overall_score: int = Field(
        description="Overall resume quality score from 0-100, considering content, "
        "structure, and (if a job description was given) job fit."
    )
    ats_score: int = Field(
        description="Estimated Applicant-Tracking-System compatibility score from 0-100, "
        "based on formatting simplicity, section headers, and keyword coverage."
    )
    summary: str = Field(
        description="A 2-3 sentence overview of the candidate's profile and how strong "
        "this resume is right now."
    )
    matched_skills: List[str] = Field(
        default_factory=list,
        description="Skills/keywords present in the resume that are relevant "
        "(and, if a job description was provided, that also appear in it).",
    )
    missing_skills: List[SkillGap] = Field(
        default_factory=list,
        description="Important skills/keywords that are missing from the resume "
        "(relative to the job description if provided, otherwise relative to the "
        "candidate's apparent target role).",
    )
    structure_feedback: List[str] = Field(
        default_factory=list,
        description="Specific feedback on resume structure/formatting: section "
        "ordering, missing sections (summary, experience, education, projects), "
        "length, use of bullet points, headings, etc.",
    )
    strengths: List[str] = Field(
        default_factory=list, description="What the resume already does well."
    )
    improvement_suggestions: List[str] = Field(
        default_factory=list,
        description="Concrete, actionable suggestions to improve the resume. "
        "Each item should be specific enough to act on immediately "
        "(e.g. 'Quantify the impact of the X project with a metric').",
    )


class ChatReply(BaseModel):
    answer: str = Field(description="A concise, helpful answer to the user's question.")


# ---------------------------------------------------------------------------
# LLM + chains
# ---------------------------------------------------------------------------
def _get_llm(temperature: float = 0.3) -> ChatGoogleGenerativeAI:
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise RuntimeError(
            "GOOGLE_API_KEY is not set. Add it to your .env file "
            "(see .env.example) before running an analysis."
        )
    model = os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite")
    return ChatGoogleGenerativeAI(model=model, temperature=temperature, google_api_key=api_key)


ANALYSIS_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are an expert resume reviewer and career coach who has screened "
            "thousands of resumes for ATS systems and hiring managers. Analyze the "
            "resume thoroughly and honestly. Be specific and reference actual content "
            "from the resume rather than generic advice. If a job description is "
            "provided, tailor matched/missing skills and suggestions to that job. "
            "If no job description is provided, evaluate against strong general "
            "practices for the candidate's apparent field/seniority.",
        ),
        (
            "human",
            "RESUME TEXT:\n---\n{resume_text}\n---\n\n"
            "JOB DESCRIPTION (optional, may be empty):\n---\n{job_description}\n---\n\n"
            "Analyze this resume and return the structured result.",
        ),
    ]
)

CHAT_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are an AI resume assistant. Answer the user's question about their "
            "resume clearly and concisely, grounded in the resume text, the target job "
            "description (if any), and the prior analysis provided as context. If asked "
            "something unrelated to resumes, careers, or job applications, politely "
            "steer the conversation back.",
        ),
        (
            "human",
            "RESUME TEXT:\n---\n{resume_text}\n---\n\n"
            "TARGET JOB DESCRIPTION (may be empty if none was provided):\n---\n{job_description}\n---\n\n"
            "PRIOR ANALYSIS SUMMARY:\n{analysis_summary}\n\n"
            "PRIOR ANALYSIS DETAILS (matched/missing skills, suggestions):\n{analysis_details}\n\n"
            "CONVERSATION SO FAR:\n{chat_history}\n\n"
            "USER QUESTION: {question}",
        ),
    ]
)


def analyze_resume(resume_text: str, job_description: Optional[str] = None) -> ResumeAnalysis:
    llm = _get_llm(temperature=0.3)
    structured_llm = llm.with_structured_output(ResumeAnalysis)
    chain = ANALYSIS_PROMPT | structured_llm

    result: ResumeAnalysis = chain.invoke(
        {
            "resume_text": resume_text[:MAX_RESUME_CHARS],
            "job_description": (job_description or "").strip()[:4000] or "(none provided)",
        }
    )

    # Clamp scores defensively in case the model drifts outside 0-100.
    result.overall_score = max(0, min(100, result.overall_score))
    result.ats_score = max(0, min(100, result.ats_score))
    return result


def answer_question(
    resume_text: str,
    analysis_summary: str,
    chat_history: List[dict],
    question: str,
    job_description: Optional[str] = None,
    analysis_details: Optional[dict] = None,
) -> str:
    llm = _get_llm(temperature=0.4)
    structured_llm = llm.with_structured_output(ChatReply)
    chain = CHAT_PROMPT | structured_llm

    history_str = "\n".join(
        f"{'User' if m['role'] == 'user' else 'Assistant'}: {m['content']}"
        for m in chat_history[-8:]  # keep a short rolling window
    ) or "(no prior messages)"

    details_str = "(no details available)"
    if analysis_details:
        matched = ", ".join(analysis_details.get("matched_skills", [])) or "none"
        missing = ", ".join(
            g.get("skill", "") for g in analysis_details.get("missing_skills", [])
        ) or "none"
        suggestions = "; ".join(analysis_details.get("improvement_suggestions", [])) or "none"
        details_str = (
            f"Matched skills: {matched}\n"
            f"Missing skills: {missing}\n"
            f"Improvement suggestions: {suggestions}"
        )

    reply: ChatReply = chain.invoke(
        {
            "resume_text": resume_text[:MAX_RESUME_CHARS],
            "job_description": (job_description or "").strip()[:4000] or "(none provided)",
            "analysis_summary": analysis_summary or "(no analysis yet)",
            "analysis_details": details_str,
            "chat_history": history_str,
            "question": question,
        }
    )
    return reply.answer
