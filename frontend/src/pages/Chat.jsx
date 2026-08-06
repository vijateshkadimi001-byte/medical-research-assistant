import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import { askQuestion } from "../services/chatService";

import {
  createConversation,
  getConversations,
  getConversationMessages,
  deleteConversation,
} from "../services/conversationService";

export default function Chat() {

  const [uploadedFile, setUploadedFile] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [conversations, setConversations] = useState([]);

  const [selectedConversation, setSelectedConversation] =
    useState(null);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    try {
      const list = await getConversations();

      setConversations(list);

      if (list.length > 0) {
        await selectConversation(list[0]);
      } else {
        await newConversation();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function newConversation() {
    try {
      const conversation = await createConversation();

      setConversations((prev) => [
        conversation,
        ...prev,
      ]);

      setSelectedConversation(conversation);

      setMessages([]);

    } catch (err) {
      console.error(err);
    }
  }

  async function selectConversation(conversation) {
    try {

      setSelectedConversation(conversation);

      const history =
        await getConversationMessages(
          conversation.id
        );

      setMessages(history);

    } catch (err) {
      console.error(err);
    }
  }

  async function removeConversation(id) {

    try {

      await deleteConversation(id);

      const updated =
        conversations.filter(
          (c) => c.id !== id
        );

      setConversations(updated);

      if (
        selectedConversation &&
        selectedConversation.id === id
      ) {

        if (updated.length > 0) {
          await selectConversation(updated[0]);
        } else {
          await newConversation();
        }
      }

    } catch (err) {
      console.error(err);
    }
  }

  async function handleSend(question) {

    if (!selectedConversation) return;

    const userMessage = {
      role: "user",
      content: question,
      sources: [],
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {

      const response =
        await askQuestion(
          selectedConversation.id,
          question
        );

      const aiMessage = {
        role: "assistant",
        content: response.answer,
        sources: response.sources || [],
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      const latest =
        await getConversationMessages(
          selectedConversation.id
        );

      setMessages(latest);

      const updated =
        await getConversations();

      setConversations(updated);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ " +
            (
              error.response?.data?.detail ||
              "Something went wrong."
            ),
          sources: [],
        },
      ]);

    } finally {

      setLoading(false);

    }
  }

  return (
    <MainLayout
      uploadedFile={uploadedFile}
      handleUploadSuccess={setUploadedFile}

      conversations={conversations}
      selectedConversation={
        selectedConversation
      }
      onConversationSelect={
        selectConversation
      }
      onNewConversation={
        newConversation
      }
      onDeleteConversation={
        removeConversation
      }
    >

      <div className="flex h-full min-h-0 flex-col rounded-xl border bg-white shadow-sm">

        <div className="border-b p-5">

          <h2 className="text-2xl font-bold">
            Medical Research Assistant
          </h2>

          <p className="text-gray-500">
            Upload a medical PDF and ask
            questions about its contents.
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