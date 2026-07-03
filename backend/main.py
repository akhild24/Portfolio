from fastapi import FastAPI, HTTPException
# from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
import httpx
import os

load_dotenv()
# Try parent directory and parent's .github folder to locate .env
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".github", ".env"))

app = FastAPI()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
TO_EMAIL = "akhildwivedi453@gmail.com"


class ContactForm(BaseModel):
    name: str
    email: str
    message: str


@app.post("/api/send")
async def send_email(form: ContactForm):
    if not RESEND_API_KEY:
        raise HTTPException(status_code=500, detail="API key not configured")

    if not form.name.strip() or not form.email.strip() or not form.message.strip():
        raise HTTPException(status_code=400, detail="All fields are required")

    payload = {
        "from": "Portfolio Contact <onboarding@resend.dev>",
        "to": [TO_EMAIL],
        "subject": f"Portfolio Contact — {form.name}",
        "html": f"""
        <div style="font-family: monospace; background: #080808; color: #fcfcfc; padding: 32px; border-radius: 8px;">
            <p style="color: #00e38f; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 24px 0;">
                [ NEW MESSAGE — AKD_OS PORTFOLIO ]
            </p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="color: #7a7a8a; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; padding: 8px 0; width: 80px;">FROM</td>
                    <td style="color: #fcfcfc; font-size: 13px; padding: 8px 0;">{form.name}</td>
                </tr>
                <tr>
                    <td style="color: #7a7a8a; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; padding: 8px 0;">REPLY-TO</td>
                    <td style="color: #fcfcfc; font-size: 13px; padding: 8px 0;">{form.email}</td>
                </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #393945; margin: 20px 0;" />
            <p style="color: #7a7a8a; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 12px 0;">MESSAGE</p>
            <p style="color: #d4d2d2; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">{form.message}</p>
            <hr style="border: none; border-top: 1px solid #393945; margin: 24px 0 12px 0;" />
            <p style="color: #525260; font-size: 10px; letter-spacing: 0.1em; margin: 0;">
                EXEC_COMPLETE — AKD_OS v1.0
            </p>
        </div>
        """,
        "reply_to": form.email,
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json=payload,
            timeout=10.0,
        )

    if response.status_code not in (200, 201):
        raise HTTPException(status_code=502, detail="Failed to send email")

    return {"status": "ok", "message": "Message sent"}


# Serve React build — must come AFTER API routes
# app.mount("/", StaticFiles(directory="dist", html=True), name="static")
