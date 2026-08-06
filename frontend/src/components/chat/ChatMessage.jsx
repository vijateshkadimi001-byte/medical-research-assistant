import ReactMarkdown from "react-markdown";
import {
  UserCircle2,
  HeartPulse,
  Copy,
} from "lucide-react";

import SourceCard from "./SourceCard";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  const copyResponse = () => {
    navigator.clipboard.writeText(message.content);
  };

  if (isUser) {
    return (
      <div className="mb-8 flex justify-end">

        <div className="flex max-w-3xl items-start gap-3">

          <div className="rounded-2xl bg-blue-600 px-5 py-4 text-white shadow-md">
            <p className="leading-7">
              {message.content}
            </p>
          </div>

          <UserCircle2
            size={38}
            className="mt-1 text-blue-600"
          />

        </div>

      </div>
    );
  }

  return (
    <div className="mb-10">

      <div className="flex items-start gap-4">

        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-3 text-white shadow-md">
          <HeartPulse size={22} />
        </div>

        <div className="flex-1">

          <div className="mb-2 flex items-center justify-between">

            <h3 className="font-semibold text-slate-800">
              MedIntel
            </h3>

            <button
              onClick={copyResponse}
              className="rounded-lg p-2 transition hover:bg-slate-100"
              title="Copy response"
            >
              <Copy size={18} />
            </button>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="prose prose-slate max-w-none">
              <ReactMarkdown>
                {message.content}
              </ReactMarkdown>
            </div>

          </div>

         {message.sources?.length > 0 && (

  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">

    <h4 className="mb-2 text-sm font-semibold text-slate-700">
      📄 Sources
    </h4>

    <div className="flex flex-wrap gap-2">

      {[...new Set(message.sources.map(source => source.page))].map((page) => (
        <span
          key={page}
          className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200"
        >
          Page {page}
        </span>
      ))}

    </div>

  </div>

)}

        </div>

      </div>

    </div>
  );
}