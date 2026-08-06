print("Loading splitter.py")
print("SPLITTER: 1 - Starting imports")

from langchain_text_splitters import RecursiveCharacterTextSplitter
print("SPLITTER: 2 - RecursiveCharacterTextSplitter imported")


def split_documents(documents):
    print("SPLITTER: split_documents() called")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            "",
        ],
    )

    return splitter.split_documents(documents)