import shutil
import uuid
from pathlib import Path

from langchain_chroma import Chroma

from app.config import settings
from app.rag.embeddings import get_embedding_model


BASE_VECTOR_DB = Path(settings.CHROMA_DB_PATH)


def build_vector_store(chunks):
    """
    Create a fresh Chroma database for every upload.
    Avoids Windows file locking issues.
    """

    BASE_VECTOR_DB.mkdir(parents=True, exist_ok=True)

    # Create a unique folder for this upload
    vector_db = BASE_VECTOR_DB / str(uuid.uuid4())

    embeddings = get_embedding_model()

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=str(vector_db),
    )

    return vectorstore


def get_retriever(vectorstore):
    return vectorstore.as_retriever(
        search_kwargs={"k": 4}
    )