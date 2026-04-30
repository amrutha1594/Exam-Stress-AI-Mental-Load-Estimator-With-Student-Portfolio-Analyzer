from __future__ import annotations

import json
import re
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "stress_predictor.db"

app = FastAPI(title="Stress Predictor API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    fileContent: str = Field(min_length=1, max_length=500000)
    fileName: str = Field(min_length=1, max_length=255)
    studentName: Optional[str] = Field(default=None, max_length=100)

    @field_validator("fileName")
    @classmethod
    def sanitize_file_name(cls, value: str) -> str:
        cleaned = re.sub(r"[^a-zA-Z0-9._\- ]", "_", value).strip()
        if not cleaned:
            raise ValueError("A valid file name is required")
        return cleaned[:255]

    @field_validator("studentName")
    @classmethod
    def sanitize_student_name(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        cleaned = re.sub(r"[^a-zA-Z0-9 .\-']", "", value).strip()
        return cleaned[:100] if cleaned else None


class HealthIssue(BaseModel):
    issue: str
    description: str
    severity: Literal["mild", "moderate", "severe"]


class Analysis(BaseModel):
    id: str
    student_name: Optional[str]
    file_name: str
    stress_level: Literal["low", "moderate", "high"]
    stress_score: int
    emotional_tone: dict
    workload_indicators: dict
    performance_trends: dict
    engagement_patterns: dict
    stress_causes: list[str]
    study_schedule: dict
    stress_tips: list[str]
    health_issues: list[HealthIssue]
    analysis_summary: str
    created_at: str


class AnalyzeResponse(BaseModel):
    success: bool
    analysis: Analysis


def get_db_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_db() -> None:
    with get_db_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS portfolio_analyses (
                id TEXT PRIMARY KEY,
                student_name TEXT,
                file_name TEXT NOT NULL,
                file_content TEXT NOT NULL,
                stress_level TEXT NOT NULL,
                stress_score INTEGER NOT NULL,
                emotional_tone TEXT NOT NULL,
                workload_indicators TEXT NOT NULL,
                performance_trends TEXT NOT NULL,
                engagement_patterns TEXT NOT NULL,
                stress_causes TEXT NOT NULL,
                study_schedule TEXT NOT NULL,
                stress_tips TEXT NOT NULL,
                health_issues TEXT NOT NULL,
                analysis_summary TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )


@app.on_event("startup")
def startup_event() -> None:
    init_db()


def clamp(value: int, minimum: int = 0, maximum: int = 100) -> int:
    return max(minimum, min(maximum, value))


def count_matches(text: str, words: list[str]) -> int:
    return sum(len(re.findall(rf"\\b{re.escape(word)}\\b", text)) for word in words)


def build_schedule(stress_level: str) -> dict:
    if stress_level == "high":
        return {
            "monday": {"morning": "Review class notes (45m)", "afternoon": "Priority assignment block (90m)", "evening": "Light revision + breathing (30m)"},
            "tuesday": {"morning": "Concept recap (60m)", "afternoon": "Problem-solving session (90m)", "evening": "Walk + short revision (30m)"},
            "wednesday": {"morning": "Quiz prep (60m)", "afternoon": "Project milestone work (90m)", "evening": "Early shutdown and sleep routine"},
            "thursday": {"morning": "Flashcards + summaries (45m)", "afternoon": "Focused assignment completion (90m)", "evening": "Stretching + reflection journal"},
            "friday": {"morning": "Weak-topic review (60m)", "afternoon": "Group study (60m)", "evening": "Low-intensity catch-up only"},
            "saturday": {"morning": "Mock test (60m)", "afternoon": "Correct mistakes (60m)", "evening": "Recovery activities"},
            "sunday": {"morning": "Plan upcoming week", "afternoon": "Organize deadlines", "evening": "Full rest and reset"},
        }

    if stress_level == "moderate":
        return {
            "monday": {"morning": "Core subject review", "afternoon": "Assignment work", "evening": "Quick recap"},
            "tuesday": {"morning": "Practice questions", "afternoon": "Lab or project tasks", "evening": "Exercise + revision"},
            "wednesday": {"morning": "Reading and notes", "afternoon": "Midweek assignment push", "evening": "Relaxation routine"},
            "thursday": {"morning": "Problem-solving session", "afternoon": "Group discussion", "evening": "Flashcard revision"},
            "friday": {"morning": "Weekly summary", "afternoon": "Finish pending tasks", "evening": "Free time"},
            "saturday": {"morning": "Deep work block", "afternoon": "Skill improvement", "evening": "Social/family time"},
            "sunday": {"morning": "Weekly planning", "afternoon": "Light revision", "evening": "Prepare for Monday"},
        }

    return {
        "monday": {"morning": "Preview lectures", "afternoon": "Regular study block", "evening": "Review highlights"},
        "tuesday": {"morning": "Practice exercises", "afternoon": "Assignment progress", "evening": "Hobby / break"},
        "wednesday": {"morning": "Revision sprint", "afternoon": "Concept mapping", "evening": "Early rest"},
        "thursday": {"morning": "Short quiz prep", "afternoon": "Collaborative study", "evening": "Light reading"},
        "friday": {"morning": "Weekly checkpoint", "afternoon": "Close loose tasks", "evening": "Relaxation"},
        "saturday": {"morning": "Focus block", "afternoon": "Skill-building", "evening": "Leisure"},
        "sunday": {"morning": "Plan next week", "afternoon": "Optional review", "evening": "Rest"},
    }


def analyze_text(request: AnalyzeRequest) -> dict:
    text = request.fileContent.lower()

    high_stress_words = ["overwhelmed", "anxious", "panic", "burnout", "stress", "deadline", "late", "urgent", "exhausted"]
    positive_words = ["confident", "motivated", "improved", "organized", "balanced", "progress", "consistent"]
    workload_words = ["assignment", "project", "quiz", "exam", "deadline", "submission", "lab", "presentation"]

    stress_hits = count_matches(text, high_stress_words)
    positive_hits = count_matches(text, positive_words)
    workload_hits = count_matches(text, workload_words)

    deadline_markers = count_matches(text, ["deadline", "due", "submission", "final", "midterm", "exam week"])
    sleep_markers = count_matches(text, ["sleep", "insomnia", "tired", "fatigue", "rest"])

    raw_score = 40 + stress_hits * 7 + workload_hits * 2 + deadline_markers * 4 + sleep_markers * 3 - positive_hits * 5
    stress_score = clamp(raw_score)

    if stress_score >= 67:
        stress_level: Literal["low", "moderate", "high"] = "high"
    elif stress_score >= 34:
        stress_level = "moderate"
    else:
        stress_level = "low"

    confidence = clamp(65 + positive_hits * 5 - stress_hits * 4)
    anxiety = clamp(25 + stress_hits * 8 + deadline_markers * 3)
    motivation = clamp(55 + positive_hits * 5 - sleep_markers * 3)
    overwhelm = clamp(20 + stress_hits * 9 + workload_hits * 2)

    primary_emotion = max(
        [
            ("confidence", confidence),
            ("anxiety", anxiety),
            ("motivation", motivation),
            ("overwhelm", overwhelm),
        ],
        key=lambda x: x[1],
    )[0]

    course_code_hits = len(re.findall(r"\b[a-z]{2,4}\d{2,4}\b", text))
    course_word_hits = count_matches(text, ["course", "subject", "class"])
    course_count = min(8, max(1, course_code_hits + min(4, course_word_hits)))

    if workload_hits >= 12:
        assignment_density = "high"
    elif workload_hits >= 5:
        assignment_density = "moderate"
    else:
        assignment_density = "low"

    deadline_clustering = deadline_markers >= 3

    extracurricular_hits = count_matches(text, ["club", "sports", "internship", "volunteer", "competition", "part-time"])
    if extracurricular_hits >= 4:
        extracurricular_load = "heavy"
    elif extracurricular_hits >= 2:
        extracurricular_load = "moderate"
    else:
        extracurricular_load = "minimal"

    decline_hits = count_matches(text, ["decline", "drop", "worse", "struggle", "low grade", "missed"])
    improve_hits = count_matches(text, ["improve", "better", "strong", "progress", "high grade"])
    if improve_hits > decline_hits + 1:
        overall_trend = "improving"
    elif decline_hits > improve_hits + 1:
        overall_trend = "declining"
    else:
        overall_trend = "stable"

    if stress_level == "high":
        participation_level = "low"
        study_consistency = "irregular"
        time_management = "poor"
    elif stress_level == "moderate":
        participation_level = "moderate"
        study_consistency = "moderate"
        time_management = "fair"
    else:
        participation_level = "high"
        study_consistency = "consistent"
        time_management = "good"

    stress_causes: list[str] = []
    if assignment_density == "high":
        stress_causes.append("Heavy assignment and project workload in a short timeframe")
    if deadline_clustering:
        stress_causes.append("Multiple deadlines and assessments appear close together")
    if anxiety > 60:
        stress_causes.append("Language indicates strong anxiety around academic performance")
    if sleep_markers >= 2:
        stress_causes.append("Sleep and fatigue concerns are reducing recovery time")
    if extracurricular_load != "minimal":
        stress_causes.append("Balancing academics with extracurricular commitments adds pressure")

    if not stress_causes:
        stress_causes = [
            "Routine academic workload with occasional deadline pressure",
            "Need for consistent planning to avoid last-minute work",
            "Sustaining motivation across multiple subjects",
        ]

    stress_tips = [
        "Use a weekly planner to break large tasks into 30-60 minute blocks.",
        "Start the highest-impact assignment first during your peak focus hours.",
        "Apply the 50/10 method: 50 minutes focused work, 10 minutes recharge.",
        "Review deadlines every evening and adjust priorities for the next day.",
        "Protect 7-8 hours of sleep to improve memory and concentration.",
        "Limit multitasking by keeping only one active study objective at a time.",
    ]

    health_issues: list[dict] = []
    if stress_level == "high":
        health_issues = [
            {"issue": "Chronic fatigue", "description": "Sustained stress and long study hours may reduce energy and focus.", "severity": "severe"},
            {"issue": "Sleep disruption", "description": "Frequent worry about deadlines can lead to insomnia or poor sleep quality.", "severity": "severe"},
            {"issue": "Anxiety symptoms", "description": "High pressure can trigger persistent worry, restlessness, and concentration issues.", "severity": "moderate"},
            {"issue": "Burnout risk", "description": "Continuous overload without recovery time can cause emotional exhaustion.", "severity": "moderate"},
        ]
    elif stress_level == "moderate":
        health_issues = [
            {"issue": "Tension headaches", "description": "Regular academic pressure may increase muscle tension and headaches.", "severity": "moderate"},
            {"issue": "Sleep inconsistency", "description": "Irregular study patterns can make sleep schedules unstable.", "severity": "moderate"},
            {"issue": "Reduced concentration", "description": "Mid-level stress can make sustained attention harder.", "severity": "mild"},
        ]
    else:
        health_issues = [
            {"issue": "Occasional fatigue", "description": "Normal study demands can still cause mild tiredness if breaks are skipped.", "severity": "mild"},
            {"issue": "Eye strain", "description": "Extended screen or reading time may cause temporary discomfort.", "severity": "mild"},
            {"issue": "Mild tension", "description": "Short periods of stress can produce temporary physical tension.", "severity": "mild"},
        ]

    if overall_trend == "improving":
        strengths = [
            "Demonstrates momentum and willingness to improve",
            "Shows signs of active engagement with coursework",
            "Maintains useful study habits under pressure",
        ]
        improvements = [
            "Avoid overcommitting during peak assessment periods",
            "Keep consistent sleep and recovery routines",
            "Maintain structured weekly planning",
        ]
    elif overall_trend == "declining":
        strengths = [
            "Remains committed despite pressure",
            "Recognizes current academic challenges",
            "Has opportunities to regain control through planning",
        ]
        improvements = [
            "Prioritize high-weight assignments first",
            "Seek academic support earlier for difficult topics",
            "Reduce task switching and improve focus blocks",
        ]
    else:
        strengths = [
            "Maintains a stable baseline in coursework",
            "Balances multiple subjects with moderate consistency",
            "Shows potential to improve with structured planning",
        ]
        improvements = [
            "Increase consistency in daily review",
            "Improve prioritization around clustered deadlines",
            "Use active recall and practice testing more often",
        ]

    summary = (
        f"The portfolio indicates a {stress_level} stress profile with a stress score of {stress_score}/100. "
        f"Primary emotional signal is {primary_emotion}, shaped by workload intensity and deadline pressure. "
        "A structured weekly plan and consistent recovery habits should improve both stress management and performance."
    )

    return {
        "stress_level": stress_level,
        "stress_score": stress_score,
        "emotional_tone": {
            "confidence": confidence,
            "anxiety": anxiety,
            "motivation": motivation,
            "overwhelm": overwhelm,
            "primary_emotion": primary_emotion,
        },
        "workload_indicators": {
            "course_count": course_count,
            "assignment_density": assignment_density,
            "deadline_clustering": deadline_clustering,
            "extracurricular_load": extracurricular_load,
        },
        "performance_trends": {
            "overall_trend": overall_trend,
            "strengths": strengths,
            "areas_for_improvement": improvements,
        },
        "engagement_patterns": {
            "participation_level": participation_level,
            "study_consistency": study_consistency,
            "time_management": time_management,
        },
        "stress_causes": stress_causes[:5],
        "study_schedule": build_schedule(stress_level),
        "stress_tips": stress_tips,
        "health_issues": health_issues,
        "analysis_summary": summary,
    }


def insert_analysis(request: AnalyzeRequest, generated: dict) -> dict:
    record_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()

    row = {
        "id": record_id,
        "student_name": request.studentName,
        "file_name": request.fileName,
        "file_content": request.fileContent[:50000],
        "stress_level": generated["stress_level"],
        "stress_score": generated["stress_score"],
        "emotional_tone": json.dumps(generated["emotional_tone"]),
        "workload_indicators": json.dumps(generated["workload_indicators"]),
        "performance_trends": json.dumps(generated["performance_trends"]),
        "engagement_patterns": json.dumps(generated["engagement_patterns"]),
        "stress_causes": json.dumps(generated["stress_causes"]),
        "study_schedule": json.dumps(generated["study_schedule"]),
        "stress_tips": json.dumps(generated["stress_tips"]),
        "health_issues": json.dumps(generated["health_issues"]),
        "analysis_summary": generated["analysis_summary"],
        "created_at": created_at,
    }

    with get_db_connection() as conn:
        conn.execute(
            """
            INSERT INTO portfolio_analyses (
                id, student_name, file_name, file_content, stress_level, stress_score,
                emotional_tone, workload_indicators, performance_trends, engagement_patterns,
                stress_causes, study_schedule, stress_tips, health_issues,
                analysis_summary, created_at
            ) VALUES (
                :id, :student_name, :file_name, :file_content, :stress_level, :stress_score,
                :emotional_tone, :workload_indicators, :performance_trends, :engagement_patterns,
                :stress_causes, :study_schedule, :stress_tips, :health_issues,
                :analysis_summary, :created_at
            )
            """,
            row,
        )

    return {
        "id": record_id,
        "student_name": request.studentName,
        "file_name": request.fileName,
        "stress_level": generated["stress_level"],
        "stress_score": generated["stress_score"],
        "emotional_tone": generated["emotional_tone"],
        "workload_indicators": generated["workload_indicators"],
        "performance_trends": generated["performance_trends"],
        "engagement_patterns": generated["engagement_patterns"],
        "stress_causes": generated["stress_causes"],
        "study_schedule": generated["study_schedule"],
        "stress_tips": generated["stress_tips"],
        "health_issues": generated["health_issues"],
        "analysis_summary": generated["analysis_summary"],
        "created_at": created_at,
    }


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/api/analyze", response_model=AnalyzeResponse)
def analyze(payload: AnalyzeRequest) -> dict:
    try:
        generated = analyze_text(payload)
        saved = insert_analysis(payload, generated)
        return {"success": True, "analysis": saved}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Analysis failed") from exc


@app.get("/api/analyses")
def list_analyses(limit: int = 20) -> dict:
    with get_db_connection() as conn:
        rows = conn.execute(
            "SELECT * FROM portfolio_analyses ORDER BY created_at DESC LIMIT ?",
            (max(1, min(limit, 100)),),
        ).fetchall()

    result = []
    for row in rows:
        result.append(
            {
                "id": row["id"],
                "student_name": row["student_name"],
                "file_name": row["file_name"],
                "stress_level": row["stress_level"],
                "stress_score": row["stress_score"],
                "emotional_tone": json.loads(row["emotional_tone"]),
                "workload_indicators": json.loads(row["workload_indicators"]),
                "performance_trends": json.loads(row["performance_trends"]),
                "engagement_patterns": json.loads(row["engagement_patterns"]),
                "stress_causes": json.loads(row["stress_causes"]),
                "study_schedule": json.loads(row["study_schedule"]),
                "stress_tips": json.loads(row["stress_tips"]),
                "health_issues": json.loads(row["health_issues"]),
                "analysis_summary": row["analysis_summary"],
                "created_at": row["created_at"],
            }
        )

    return {"analyses": result}
