print("Loading embeddings.py")

from functools import lru_cache

print("EMBEDDINGS: lru_cache imported")


@lru_cache(maxsize=1)
def get_embedding_model():
    print("EMBEDDINGS: get_embedding_model() called")
    raise Exception("Reached embeddings.py")