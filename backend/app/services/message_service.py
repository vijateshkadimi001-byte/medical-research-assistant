import json

from sqlalchemy.orm import Session

from app.database.models import (
    Message,
    Conversation,
)


def save_message(
    db: Session,
    conversation_id: int,
    role: str,
    content: str,
    sources=None,
):

    message = Message(
        conversation_id=conversation_id,
        role=role,
        content=content,
        sources=json.dumps(sources or []),
    )

    db.add(message)

    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id
        )
        .first()
    )

    if conversation:

        if conversation.title == "New Chat" and role == "user":

            conversation.title = (
                content[:40]
                if len(content) <= 40
                else content[:40] + "..."
            )

        db.add(conversation)

    db.commit()

    db.refresh(message)

    return message


def get_messages(
    db: Session,
    conversation_id: int,
):

    return (
        db.query(Message)
        .filter(
            Message.conversation_id == conversation_id
        )
        .order_by(Message.created_at)
        .all()
    )