import api from "./api";

export async function askQuestion(
  conversationId,
  question
) {
  const response = await api.post("/chat", {
    conversation_id: conversationId,
    question,
  });

  return response.data;
}