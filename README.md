# VAHA — Vehicle Autonomous Health Assistant

EY TechAthon 2025 prototype. AI agent-powered predictive maintenance for Hero MotoCorp and Mahindra & Mahindra vehicles.

## Run locally
```
pip install -r requirements.txt
python app.py
```

Open http://127.0.0.1:5000

## Generate HERA demo audio
```
python create_audio.py
```

## Deploy
Configured for gunicorn / Render / AWS EB.

## Live Demo
Deployed on Render. See hackathon submission for link.

## Pages
- `/` — Landing
- `/dashboard` — Live fleet monitoring
- `/vehicles` — Fleet management
- `/hera` — Voice AI demo
- `/service-centers` — Center utilization
- `/manufacturing` — RCA/CAPA insights
- `/ueba` — Security dashboard
- `/analytics` — ROI and KPIs
