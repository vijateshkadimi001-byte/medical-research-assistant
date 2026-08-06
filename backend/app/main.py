from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine, Base
from app.auth.auth_service import create_admin_user
from app.database.database import SessionLocal

from app.routers.auth import router as auth_router

from app.routers.health import router as health_router
from app.routers.upload import router as upload_router
from app.routers.chat import router as chat_router

from app.config import settings

from app.routers.conversations import (
    router as conversation_router
)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI Medical Research Assistant",
)

print(">>> Starting app")

Base.metadata.create_all(bind=engine)
print(">>> Database created")

db = SessionLocal()
print(">>> Database session opened")

create_admin_user(db)
print(">>> Admin user checked")

db.close()
print(">>> Database session closed")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # We'll restrict this before deployment.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(auth_router)
app.include_router(conversation_router)

@app.get("/")
def root():
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
    }