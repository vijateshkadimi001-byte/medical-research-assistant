import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend, loading }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim() || loading) return;

    onSend(question);

    setQuestion("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-t bg-white p-5"
    >
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a medical research question..."
        className="flex-1 rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        <Send size={18} />
        Send
      </button>
    </form>
  );
}