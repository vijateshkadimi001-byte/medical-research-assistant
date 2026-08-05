from fastapi import APIRouter, HTTPException

from fastapi import Depends
from app.auth.dependencies import get_current_user
from app.database.models import User

from app.models.schemas import ChatRequest, ChatResponse, Source
from app.services.memory_service import state
from app.services.llm_service import generate_answer

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user)
):

    # Check if a PDF has been uploaded
    if not state.ready or state.retriever is None:
        raise HTTPException(
            status_code=400,
            detail="Please upload a medical PDF before asking questions."
        )

    try:
        # Retrieve relevant document chunks
        documents = state.retriever.invoke(request.question)

        # Build context for Gemini
        context = "\n\n".join(doc.page_content for doc in documents)

        # Generate answer
        answer = generate_answer(
            context=context,
            question=request.question,
        )

        # Create simple citations
        
        sources = []

        for doc in documents:
            page = doc.metadata.get("page", "Unknown")

            preview = doc.page_content.strip().replace("\n", " ")

            if len(preview) > 180:
                preview = preview[:180] + "..."

            sources.append(
                Source(
                    page=page,
                    source=state.uploaded_file,
                    preview=preview,
                )
            )

        return ChatResponse(
            answer=answer,
            sources=sources,
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process your question: {str(e)}",
        )