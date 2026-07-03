# ═══════════════════════════════════════════════════════════════════════════════
# BACKEND — FastAPI + Uvicorn
# Optimized for AWS EC2 t2.micro (1 vCPU / 1 GB RAM)
# ═══════════════════════════════════════════════════════════════════════════════

FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY main.py ./

EXPOSE 8000

# Single worker for t2.micro — saves memory
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
