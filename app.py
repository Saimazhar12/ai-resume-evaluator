"""
AI Resume Analyzer - Flask backend.

Routes
------
GET  /                render the single-page web tool
POST /api/analyze      upload a PDF/DOCX resume (+ optional job description) -> AI feedback
POST /api/chat          ask a follow-up question about the analyzed resume
"""
from __future__ import annotations

import os
import traceback

from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.exceptions import RequestEntityTooLarge

from analyzer.parser import extract_text, allowed_file, UnsupportedFileType, EmptyResumeError
from analyzer.chain import analyze_resume, answer_question

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY", "dev-secret-key")
app.config["MAX_CONTENT_LENGTH"] = int(os.getenv("MAX_UPLOAD_MB", "8")) * 1024 * 1024

# The React (Vite) frontend runs on a different origin/port in development
# (e.g. http://localhost:5173) and calls this API directly, so CORS must be
# enabled for the /api/* routes. Restrict to known dev/prod origins via
# FRONTEND_ORIGIN rather than opening this up to "*".
_frontend_origins = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173,http://127.0.0.1:5173").split(",")
CORS(app, resources={r"/api/*": {"origins": _frontend_origins}})


@app.errorhandler(RequestEntityTooLarge)
def handle_large_file(_e):
    max_mb = os.getenv("MAX_UPLOAD_MB", "8")
    return jsonify({"error": f"File is too large. Max size is {max_mb}MB."}), 413


@app.route("/")
def index():
    # The UI now lives in the separate React (Vite) app under /frontend.
    # This route just confirms the API is up and lists what's available.
    return jsonify(
        {
            "service": "resume-analyzer-api",
            "status": "ok",
            "endpoints": {
                "analyze": "POST /api/analyze (multipart: resume, job_description)",
                "chat": "POST /api/chat (json: resume_text, analysis_summary, chat_history, question)",
            },
            "frontend": "Run the React app in /frontend (npm run dev) and open http://localhost:5173",
        }
    )


@app.route("/api/analyze", methods=["POST"])
def api_analyze():
    if "resume" not in request.files or request.files["resume"].filename == "":
        return jsonify({"error": "Please attach a resume file (PDF or DOCX)."}), 400

    resume_file = request.files["resume"]
    job_description = request.form.get("job_description", "")

    if not allowed_file(resume_file.filename):
        return jsonify({"error": "Only PDF and DOCX files are supported."}), 400

    try:
        resume_text = extract_text(resume_file)
    except (UnsupportedFileType, EmptyResumeError) as e:
        return jsonify({"error": str(e)}), 400

    try:
        analysis = analyze_resume(resume_text, job_description)
    except RuntimeError as e:
        # Missing/invalid API key etc.
        return jsonify({"error": str(e)}), 500
    except Exception:
        traceback.print_exc()
        return jsonify({"error": "Something went wrong while analyzing the resume. Please try again."}), 500

    return jsonify(
        {
            "resume_text": resume_text,  # returned so the client can keep it for chat follow-ups
            "analysis": analysis.model_dump(),
        }
    )


@app.route("/api/chat", methods=["POST"])
def api_chat():
    data = request.get_json(silent=True) or {}
    resume_text = (data.get("resume_text") or "").strip()
    analysis_summary = (data.get("analysis_summary") or "").strip()
    chat_history = data.get("chat_history") or []
    question = (data.get("question") or "").strip()
    job_description = (data.get("job_description") or "").strip()
    analysis_details = data.get("analysis_details") or None

    if not resume_text:
        return jsonify({"error": "No resume context found. Please analyze a resume first."}), 400
    if not question:
        return jsonify({"error": "Please enter a question."}), 400

    try:
        answer = answer_question(
            resume_text,
            analysis_summary,
            chat_history,
            question,
            job_description=job_description,
            analysis_details=analysis_details,
        )
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500
    except Exception:
        traceback.print_exc()
        return jsonify({"error": "Something went wrong answering that. Please try again."}), 500

    return jsonify({"answer": answer})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
