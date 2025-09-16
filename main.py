from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
import os
import os


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(title="StackLyft Landing", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Contact form model
class ContactForm(BaseModel):
    name: str
    business: str
    email: str
    extraInfo: str = ""

def send_contact_email(form_data: ContactForm):
    """Send email notification when contact form is submitted"""
    try:
        msg = MIMEMultipart()
        msg['From'] = "noreplystacklyft@gmail.com"
        msg['To'] = "noreplystacklyft@gmail.com"
        msg['Subject'] = f"New StackLyft Early Access Request - {form_data.business}"

        body = f"""
        <html>
        <body>
            <h2>New Early Access Request</h2>
            <p><strong>Name:</strong> {form_data.name}</p>
            <p><strong>Business:</strong> {form_data.business}</p>
            <p><strong>Email:</strong> {form_data.email}</p>
            <p><strong>Additional Info:</strong></p>
            <p>{form_data.extraInfo if form_data.extraInfo else 'No additional information provided'}</p>
            <hr>
            <p><small>Submitted via StackLyft landing page</small></p>
        </body>
        </html>
        """

        msg.attach(MIMEText(body, 'html'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login("noreplystacklyft@gmail.com", "zupz urvd xmen ytve")
        server.send_message(msg)
        server.quit()

        return True
    except Exception as e:
        logger.error(f"Error sending email: {e}")
        return False

@app.post("/api/submit-contact-form")
async def submit_contact_form(form_data: ContactForm):
    """Handle contact form submissions"""
    try:
        if send_contact_email(form_data):
            logger.info(f"Contact form submitted: {form_data.business} - {form_data.email}")
            return {"success": True, "message": "Form submitted successfully!"}
        else:
            raise HTTPException(status_code=500, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Error processing contact form: {e}")
        raise HTTPException(status_code=500, detail="Server error")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "message": "StackLyft Landing Server is running"}

@app.get("/")
async def serve_landing():
    """Serve the landing page"""
    return FileResponse("index.html")

@app.get("/{file_path:path}")
async def serve_static(file_path: str):
    """Serve static files"""
    if os.path.exists(file_path):
        return FileResponse(file_path)
    else:
        return FileResponse("index.html")

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting StackLyft Landing Server...")
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, log_level="info")