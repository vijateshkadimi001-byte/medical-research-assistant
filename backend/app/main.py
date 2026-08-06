from fastapi import FastAPI

app = FastAPI(
    title="MedIntel",
    version="1.0.0",
)

@app.get("/")
def root():
    return {
        "status": "running",
        "message": "MedIntel Backend is Live!"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }