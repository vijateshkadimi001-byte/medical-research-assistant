from pathlib import Path
import shutil
import traceback

print("UPLOAD: 1 - Standard libraries imported")

from fastapi import Depends
print("UPLOAD: 2 - fastapi Depends imported")

from app.auth.dependencies import get_current_user
print("UPLOAD: 3 - auth dependencies imported")

from app.database.models import User
print("UPLOAD: 4 - User model imported")

from app.services.memory_service import get_state, clear_state
print("UPLOAD: 5 - memory_service imported")

from fastapi import APIRouter, File, HTTPException, UploadFile
print("UPLOAD: 6 - FastAPI router imported")

from app.config import settings
print("UPLOAD: 7 - settings imported")

#from app.rag.pipeline import build_rag_pipeline
print("UPLOAD: 8 - build_rag_pipeline imported")

from app.models.schemas import UploadResponse
print("UPLOAD: 9 - UploadResponse imported")

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)

print("UPLOAD: 10 - Router created")

UPLOAD_DIR = Path(settings.UPLOAD_FOLDER)
print("UPLOAD: 11 - Upload path created")

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
print("UPLOAD: 12 - Upload directory ensured")


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