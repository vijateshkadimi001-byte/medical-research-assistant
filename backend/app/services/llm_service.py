from functools import lru_cache

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI

from app.config import settings


SYSTEM_PROMPT = """
You are MedIntel, an AI Medical Research Assistant.

Rules:

- Answer ONLY using the provided document context.
- Explain medical research clearly.
- Summarize scientific findings.
- Compare studies if asked.
- Explain medical terminology.

Never:

- Diagnose diseases
- Prescribe medicine
- Hallucinate information

If the uploaded documents do not contain enough information,
say that clearly.

Politely refuse unrelated questions.
"""


@lru_cache(maxsize=1)
def get_llm():

    return ChatGoogleGenerativeAI(
        model=settings.MODEL_NAME,
        google_api_key=settings.GOOGLE_API_KEY,
        temperature=0.2,
    )


def generate_answer(context: str, question: str) -> str:
    llm = get_llm()

    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(
            content=f"""
Context:

{context}

Question:

{question}
"""
        ),
    ]

    response = llm.invoke(messages)

    if isinstance(response.content, str):
        return response.content

    if isinstance(response.content, list):
        text_parts = []

        for item in response.content:
            if isinstance(item, dict):
                if item.get("type") == "text":
                    text_parts.append(item.get("text", ""))
            elif hasattr(item, "text"):
                text_parts.append(item.text)

        return "\n".join(text_parts)

    return str(response.content)