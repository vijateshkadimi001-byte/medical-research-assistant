import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

export default function ChatInput({ onSend, loading }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim() || loading) return;

    onSend(question);
    setQuestion("");
  };

  return (
    <div className="border-t border-slate-200 bg-white p-5">

      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-4"
      >

        <textarea
          rows={1}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a medical research question..."
          disabled={loading}
          className="max-h-40 min-h-[54px] flex-1 resize-none rounded-2xl border border-slate-300 px-5 py-4 text-slate-700 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />

        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="flex h-[54px] w-[54px] items-center justify-center rounded-2xl bg-blue-600 text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:bg-slate-300"
        >
          {loading ? (
            <Loader2
              size={22}
              className="animate-spin"
            />
          ) : (
            <Send size={22} />
          )}
        </button>

      </form>

      <p className="mt-3 text-center text-xs text-slate-400">
        MedIntel may generate incorrect information. Always verify with the original research paper.
      </p>

    </div>
  );
}