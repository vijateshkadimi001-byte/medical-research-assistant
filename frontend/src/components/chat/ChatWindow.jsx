import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">

        <div className="text-center">

          <h2 className="mb-3 text-3xl font-bold">
            AI Medical Research Assistant
          </h2>

          <p className="mb-6 text-gray-500">
            Upload a medical PDF and ask questions about it.
          </p>

          <div className="space-y-2 text-sm text-gray-600">
            <p>• Summarize this paper</p>
            <p>• Explain the methodology</p>
            <p>• List the main findings</p>
            <p>• What are the conclusions?</p>
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">

      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
        />
      ))}

      {loading && <TypingIndicator />}

      <div ref={bottomRef} />

    </div>
  );
}