from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader


def load_pdf(pdf_path: str):
    """
    Load a PDF and return LangChain Document objects.
    """

    path = Path(pdf_path)

    loader = PyPDFLoader(str(path))

    return loader.load()