from pathlib import Path
import shutil
import traceback

from fastapi import Depends
from app.auth.dependencies import get_current_user
from app.database.models import User

from app.services.memory_service import get_state, clear_state

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.config import settings
from app.rag.pipeline import build_rag_pipeline
from app.services.memory_service import get_state
from app.models.schemas import UploadResponse

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)

UPLOAD_DIR = Path(settings.UPLOAD_FOLDER)
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("", response_model=UploadResponse)
async def upload_pdf(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """
    Upload a medical PDF and build the RAG pipeline.
    """

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    try:
        # Save PDF
        pdf_path = UPLOAD_DIR / file.filename

        with pdf_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Build RAG
        pipeline = build_rag_pipeline(str(pdf_path))

        # Store application state
        state = get_state(current_user.id)
        state.retriever = pipeline.retriever
        state.vectorstore = pipeline.vectorstore
        state.uploaded_file = file.filename
        state.ready = True

        return {
            "success": True,
            "message": "Medical document indexed successfully.",
            "filename": file.filename,
            "chunks": len(pipeline.chunks),
        }

    except Exception as e:
        traceback.print_exc()   # Prints the full traceback in the terminal
        
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.delete("")
async def delete_uploaded_pdf(
    current_user: User = Depends(get_current_user)
):
    state = get_state(current_user.id)

    if not state.ready:
        raise HTTPException(
            status_code=404,
            detail="No uploaded document found."
        )

    clear_state(current_user.id)

    return {
        "success": True,
        "message": "Document removed successfully."
    }