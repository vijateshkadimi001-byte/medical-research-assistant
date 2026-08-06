from sqlalchemy.orm import Session

from app.database.models import Conversation


def create_conversation(
    db: Session,
    user_id: int,
    title: str = "New Chat",
):

    conversation = Conversation(
        title=title,
        user_id=user_id,
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation


def get_conversations(
    db: Session,
    user_id: int,
):

    return (
        db.query(Conversation)
        .filter(
            Conversation.user_id == user_id
        )
        .order_by(
            Conversation.updated_at.desc()
        )
        .all()
    )


def get_conversation(
    db: Session,
    conversation_id: int,
    user_id: int,
):

    return (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id,
            Conversation.user_id == user_id,
        )
        .first()
    )


def delete_conversation(
    db: Session,
    conversation: Conversation,
):

    db.delete(conversation)
    db.commit()