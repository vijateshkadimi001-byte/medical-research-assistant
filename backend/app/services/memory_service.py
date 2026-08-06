from dataclasses import dataclass
from typing import Optional


@dataclass
class AppState:
    retriever: Optional[object] = None
    vectorstore: Optional[object] = None
    uploaded_file: Optional[str] = None
    ready: bool = False


user_states = {}


def get_state(user_id: int) -> AppState:
    if user_id not in user_states:
        user_states[user_id] = AppState()

    return user_states[user_id]

def clear_state(user_id: int):
    if user_id in user_states:
        user_states[user_id] = AppState()

def clear_state(user_id: int):
    if user_id in user_states:
        del user_states[user_id]