print("EMBEDDINGS: 1 - Starting imports")

from functools import lru_cache
print("EMBEDDINGS: 2 - lru_cache imported")

from langchain_huggingface import HuggingFaceEmbeddings
print("EMBEDDINGS: 3 - HuggingFaceEmbeddings imported")


@lru_cache(maxsize=1)
def get_embedding_model():
    print("EMBEDDINGS: get_embedding_model() called")

    return HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={
            "device": "cpu",
        },
        encode_kwargs={
            "normalize_embeddings": True,
        },
    )