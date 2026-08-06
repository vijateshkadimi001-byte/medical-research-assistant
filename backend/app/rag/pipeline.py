print("Loading pipeline.py")
print("PIPELINE: 1 - Starting imports")

from dataclasses import dataclass
print("PIPELINE: 2 - dataclass imported")

from app.rag.loader import load_pdf
print("PIPELINE: 3 - loader imported")

from app.rag.splitter import split_documents
print("PIPELINE: 4 - splitter imported")

from app.rag.vector_store import (
    build_vector_store,
    get_retriever,
)
print("PIPELINE: 5 - vector_store imported")


@dataclass
class RAGPipeline:
    documents: list
    chunks: list
    vectorstore: object
    retriever: object

print("PIPELINE: 6 - RAGPipeline dataclass created")


def build_rag_pipeline(pdf_path):
    print("PIPELINE: build_rag_pipeline() called")

    documents = load_pdf(pdf_path)
    print("PIPELINE: PDF loaded")

    chunks = split_documents(documents)
    print("PIPELINE: Documents split")

    vectorstore = build_vector_store(chunks)
    print("PIPELINE: Vector store built")

    retriever = get_retriever(vectorstore)
    print("PIPELINE: Retriever created")

    return RAGPipeline(
        documents=documents,
        chunks=chunks,
        vectorstore=vectorstore,
        retriever=retriever,
    )