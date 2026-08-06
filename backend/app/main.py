from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings

from app.database.database import (
    engine,
    Base,
    SessionLocal,
)

from app.auth.auth_service import create_admin_user

from app.routers.health import router as health_router

from app.routers.auth import router as auth_router

from app.routers.conversations import (
    router as conversation_router
)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

Base.metadata.create_all(bind=engine)

db = SessionLocal()
create_admin_user(db)
db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(conversation_router)

@app.get("/")
def root():
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
    }