from dataclasses import dataclass
from typing import Optional


@dataclass
class AppState:
    retriever: Optional[object] = None
    vectorstore: Optional[object] = None
    uploaded_file: Optional[str] = None
    ready: bool = False


state = AppState()