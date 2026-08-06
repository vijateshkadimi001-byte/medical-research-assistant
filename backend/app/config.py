from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "MedIntel"
    APP_VERSION: str = "1.0.0"

    GOOGLE_API_KEY: str = ""
    MODEL_NAME: str = "models/gemini-3.5-flash"
    EMBEDDING_MODEL: str = "models/gemini-embedding-001"

    UPLOAD_FOLDER: str = "app/uploads"
    CHROMA_DB_PATH: str = "app/vectorstore"

    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "admin123"

    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()