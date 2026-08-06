import { useEffect, useRef } from "react";
import {
  BrainCircuit,
  FileText,
  Search,
  BookOpen,
} from "lucide-react";

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
    <div className="flex flex-1 items-center justify-center overflow-y-auto">

      <div className="max-w-2xl text-center">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">

          <span className="text-3xl">
            🩺
          </span>

        </div>

        <h1 className="text-4xl font-bold text-slate-900">
          Welcome to MedIntel
        </h1>

        <p className="mt-4 text-lg text-slate-500">
          Your AI-powered Medical Research Assistant
        </p>

        <p className="mt-2 text-slate-400">
          Upload a research paper and ask evidence-based medical questions.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4">

          <div className="rounded-xl border bg-white p-5 text-left shadow-sm">

            <h3 className="font-semibold text-slate-800">
              📄 Summarize this paper
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Generate concise summaries of uploaded research articles.
            </p>

          </div>

          <div className="rounded-xl border bg-white p-5 text-left shadow-sm">

            <h3 className="font-semibold text-slate-800">
              🔬 Explain methodology
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Understand research methods and study design.
            </p>

          </div>

          <div className="rounded-xl border bg-white p-5 text-left shadow-sm">

            <h3 className="font-semibold text-slate-800">
              📊 Key findings
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Identify important outcomes and conclusions quickly.
            </p>

          </div>

          <div className="rounded-xl border bg-white p-5 text-left shadow-sm">

            <h3 className="font-semibold text-slate-800">
              💊 Medical Q&A
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Ask medical questions with document-backed answers.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-8">

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