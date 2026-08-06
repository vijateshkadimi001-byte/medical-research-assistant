from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.models import User

from app.auth.dependencies import get_current_user

from app.services.conversation_service import (
    create_conversation,
    get_conversations,
    get_conversation,
    delete_conversation,
)

import json

from app.services.message_service import (
    get_messages,
)

router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"],
)


@router.post("")
def new_conversation(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    conversation = create_conversation(
        db,
        current_user.id,
    )

    return conversation


@router.get("")
def list_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return get_conversations(
        db,
        current_user.id,
    )


@router.get("/{conversation_id}")
def conversation_messages(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    conversation = get_conversation(
        db,
        conversation_id,
        current_user.id,
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    messages = get_messages(
        db,
        conversation_id,
    )

    return [
        {
            "id": m.id,
            "role": m.role,
            "content": m.content,
            "sources": json.loads(m.sources or "[]"),
            "created_at": m.created_at,
        }
        for m in messages
    ]

@router.delete("/{conversation_id}")
def remove_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    conversation = get_conversation(
        db,
        conversation_id,
        current_user.id,
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    delete_conversation(
        db,
        conversation,
    )

    return {
        "message": "Conversation deleted."
    }