from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.models import User

from app.auth.dependencies import get_current_user

from app.models.schemas import (
    ChatRequest,
    ChatResponse,
    Source,
)

from app.services.memory_service import get_state
from app.services.llm_service import generate_answer

from app.services.message_service import save_message
from app.services.conversation_service import get_conversation


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    # Verify conversation belongs to current user
    conversation = get_conversation(
        db=db,
        conversation_id=request.conversation_id,
        user_id=current_user.id,
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found."
        )
    
    state = get_state(current_user.id)

    # Save user message
    save_message(
        db=db,
        conversation_id=request.conversation_id,
        role="user",
        content=request.question,
    )

    try:

        documents = []
        context = ""
        sources = []

        # Use RAG only if a PDF has been uploaded
        if state.ready and state.retriever is not None:

            documents = state.retriever.invoke(
                request.question
            )

            context = "\n\n".join(
                doc.page_content
                for doc in documents
            )

            for doc in documents:

                page = doc.metadata.get(
                    "page",
                    "Unknown"
                )

                preview = (
                    doc.page_content
                    .strip()
                    .replace("\n", " ")
                )

                if len(preview) > 180:
                    preview = preview[:180] + "..."

                sources.append(
                    Source(
                        page=page,
                        source=state.uploaded_file,
                        preview=preview,
                    )
                )

        # Generate answer
        answer = generate_answer(
            context=context,
            question=request.question,
        )

        # Save assistant message
        save_message(
            db=db,
            conversation_id=request.conversation_id,
            role="assistant",
            content=answer,
            sources=[source.model_dump() for source in sources],
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