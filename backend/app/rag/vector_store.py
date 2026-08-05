import shutil
from pathlib import Path

from langchain_chroma import Chroma

from app.config import settings
from app.rag.embeddings import get_embedding_model


VECTOR_DB = Path(settings.CHROMA_DB_PATH)


def build_vector_store(chunks):
    """
    Create a fresh Chroma database for the uploaded document.
    """

    if VECTOR_DB.exists():
        shutil.rmtree(VECTOR_DB)

    VECTOR_DB.mkdir(parents=True, exist_ok=True)

    embeddings = get_embedding_model()

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=str(VECTOR_DB),
    )

    return vectorstore


def get_retriever(vectorstore):
    return vectorstore.as_retriever(
        search_kwargs={"k": 4}
    )