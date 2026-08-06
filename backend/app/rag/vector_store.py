print("VECTOR: 1 - Starting imports")

import uuid
from pathlib import Path
print("VECTOR: 2 - uuid/pathlib imported")

from langchain_chroma import Chroma
print("VECTOR: 3 - Chroma imported")

from app.config import settings
print("VECTOR: 4 - settings imported")

from app.rag.embeddings import get_embedding_model
print("VECTOR: 5 - embeddings imported")


BASE_VECTOR_DB = Path(settings.CHROMA_DB_PATH)
print("VECTOR: 6 - BASE_VECTOR_DB created")


def build_vector_store(chunks):
    print("VECTOR: build_vector_store() called")

    BASE_VECTOR_DB.mkdir(parents=True, exist_ok=True)
    print("VECTOR: directory created")

    vector_db = BASE_VECTOR_DB / str(uuid.uuid4())
    print("VECTOR: unique directory created")

    embeddings = get_embedding_model()
    print("VECTOR: embeddings loaded")

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=str(vector_db),
    )

    print("VECTOR: Chroma created")

    return vectorstore


def get_retriever(vectorstore):
    print("VECTOR: retriever created")
    return vectorstore.as_retriever(
        search_kwargs={"k": 4}
    )