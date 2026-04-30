# Stress Predictor AI

This project now uses:

- React + Vite frontend
- Python FastAPI backend
- SQLite database (local file, no Supabase)

## Project structure

- `src/`: frontend app
- `backend/app/main.py`: FastAPI API
- `backend/stress_predictor.db`: SQLite database (created automatically)

## Backend setup (FastAPI + SQLite)

From the project root:

```sh
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend endpoints:

- `GET /health`
- `POST /api/analyze`
- `GET /api/analyses`

## Frontend setup (Vite)

From the project root:

```sh
npm install
npm run dev
```

The frontend calls the backend using `VITE_API_BASE_URL`.

Create a `.env` file in the project root if needed:

```sh
VITE_API_BASE_URL=http://localhost:8000
```

If omitted, the app defaults to `http://localhost:8000`.

## How analysis works

1. User uploads a portfolio file in the frontend.
2. Frontend extracts text and sends it to `POST /api/analyze`.
3. Backend generates stress analysis and stores the result in SQLite.
4. Frontend displays stress score, causes, schedule, tips, and health issues.

## Notes

- Supabase is not required.
- SQLite data is stored locally in `backend/stress_predictor.db`.
# Exam-Stress-AI-Mental-Load-Estimator-With-Student-Portfolio-Analyzer
# Exam-Stress-AI-Mental-Load-Estimator-With-Student-Portfolio-Analyzer
