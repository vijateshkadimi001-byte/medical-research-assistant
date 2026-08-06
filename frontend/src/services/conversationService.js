import api from "./api";

export async function createConversation() {
  const response = await api.post("/conversations");
  return response.data;
}

export async function getConversations() {
  const response = await api.get("/conversations");
  return response.data;
}

export async function getConversationMessages(id) {
  const response = await api.get(`/conversations/${id}`);
  return response.data;
}

export async function deleteConversation(id) {
  const response = await api.delete(`/conversations/${id}`);
  return response.data;
}