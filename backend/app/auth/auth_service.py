from sqlalchemy.orm import Session

from app.database.models import User

from app.auth.security import (
    hash_password,
    verify_password
)


def create_admin_user(db: Session):

    existing_user = db.query(User).filter(
        User.username == "admin"
    ).first()


    if existing_user:
        return


    admin = User(
        username="admin",
        hashed_password=hash_password(
            "admin123"
        )
    )


    db.add(admin)
    db.commit()

def create_user(
    db: Session,
    username: str,
    password: str
    ):

    existing_user = db.query(User).filter(
        User.username == username
    ).first()

    if existing_user:
        return None

    user = User(
        username=username,
        hashed_password=hash_password(password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

def authenticate_user(
    db: Session,
    username: str,
    password: str
):

    user = db.query(User).filter(
        User.username == username
    ).first()


    if not user:
        return None


    if not verify_password(
        password,
        user.hashed_password
    ):
        return None


    return user