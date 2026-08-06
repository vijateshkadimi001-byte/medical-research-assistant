print("Loading loader.py")
print("LOADER: 1 - Starting imports")

from pathlib import Path
print("LOADER: 2 - pathlib imported")

from langchain_community.document_loaders import PyPDFLoader
print("LOADER: 3 - PyPDFLoader imported")


def load_pdf(pdf_path: str):
    print("LOADER: load_pdf() called")

    path = Path(pdf_path)

    loader = PyPDFLoader(str(path))

    return loader.load()