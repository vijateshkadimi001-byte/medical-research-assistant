import { useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import { askQuestion } from "../services/chatService";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (question) => {
    // Add user message immediately
    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await askQuestion(question);

      const aiMessage = {
        role: "assistant",
        content: response.answer,
        sources: response.sources,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (error.response?.data?.detail) {
        message = error.response.data.detail;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `❌ ${message}`,
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-120px)] flex-col overflow-hidden rounded-xl border bg-white shadow-sm">

        <div className="border-b p-5">
          <h2 className="text-2xl font-bold">
            Medical Research Assistant
          </h2>

          <p className="text-gray-500">
            Upload a medical PDF and ask questions about its contents.
          </p>
        </div>

        <ChatWindow
          messages={messages}
          loading={loading}
        />

        <ChatInput
          onSend={handleSend}
          loading={loading}
        />

      </div>
    </MainLayout>
  );
}