print("1. Starting main.py")

from fastapi import FastAPI
print("2. FastAPI imported")

from fastapi.middleware.cors import CORSMiddleware
print("3. CORSMiddleware imported")

from app.database.database import engine, Base
print("4. Database imported")

from app.auth.auth_service import create_admin_user
print("5. Auth service imported")

from app.database.database import SessionLocal
print("6. SessionLocal imported")

from app.routers.auth import router as auth_router
print("7. Auth router imported")

from app.routers.health import router as health_router
print("8. Health router imported")

from app.routers.upload import router as upload_router
print("9. Upload router imported")

from app.routers.chat import router as chat_router
print("10. Chat router imported")

from app.config import settings
print("11. Config imported")

from app.routers.conversations import router as conversation_router
print("12. Conversation router imported")

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI Medical Research Assistant",
)

print("13. FastAPI app created")

Base.metadata.create_all(bind=engine)
print("14. Database tables created")

db = SessionLocal()
print("15. Session opened")

create_admin_user(db)
print("16. Admin created")

db.close()
print("17. DB closed")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("18. Middleware added")

app.include_router(health_router)
print("19. Health router added")

app.include_router(upload_router)
print("20. Upload router added")

app.include_router(chat_router)
print("21. Chat router added")

app.include_router(auth_router)
print("22. Auth router added")

app.include_router(conversation_router)
print("23. Conversation router added")

@app.get("/")
def root():
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
    }

print("24. Startup finished")