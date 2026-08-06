from pydantic import BaseModel

from typing import Any

class ChatRequest(BaseModel):
    question: str
    conversation_id: int

class Source(BaseModel):
    page: int | str
    source: str
    preview: str

class ChatResponse(BaseModel):
    answer: str
    sources: list[Source]

class HealthResponse(BaseModel):
    status: str
    app_name: str
    version: str


class UploadResponse(BaseModel):
    success: bool
    message: str
    filename: str
    chunks: int


class RegisterRequest(BaseModel):
    username: str
    password: str