from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.auth_service import (
    authenticate_user,
    create_user
)
from app.auth.security import create_access_token

from app.database.models import User
from app.auth.dependencies import get_current_user

from app.models.schemas import RegisterRequest

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):

    user = create_user(
        db=db,
        username=request.username,
        password=request.password
    )

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    return {
            "message": "User registered successfully",
            "username": user.username
        }

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    user = authenticate_user(
        db,
        form_data.username,
        form_data.password
    )


    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )


    token = create_access_token(
        {
            "sub": user.username
        }
    )


    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):
    return {
        "username": current_user.username
    }