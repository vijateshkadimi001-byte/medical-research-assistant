from dataclasses import dataclass

from app.rag.loader import load_pdf
from app.rag.splitter import split_documents
from app.rag.vector_store import (
    build_vector_store,
    get_retriever,
)


@dataclass
class RAGPipeline:
    documents: list
    chunks: list
    vectorstore: object
    retriever: object


def build_rag_pipeline(pdf_path):
    """
    Build the complete RAG pipeline from a PDF.
    """

    documents = load_pdf(pdf_path)

    chunks = split_documents(documents)

    vectorstore = build_vector_store(chunks)

    retriever = get_retriever(vectorstore)

    return RAGPipeline(
        documents=documents,
        chunks=chunks,
        vectorstore=vectorstore,
        retriever=retriever,
    )