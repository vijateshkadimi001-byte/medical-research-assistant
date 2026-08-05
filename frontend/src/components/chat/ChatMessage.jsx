import ReactMarkdown from "react-markdown";
import SourceCard from "./SourceCard";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end mb-6">

        <div className="max-w-2xl rounded-xl bg-blue-600 px-5 py-3 text-white">
          {message.content}
        </div>

      </div>
    );
  }

  return (
    <div className="mb-8">

      <div className="rounded-xl border bg-white p-5 shadow-sm">

        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        </div>

      </div>

      {message.sources?.length > 0 && (

        <div className="mt-4">

          <h3 className="mb-3 font-semibold text-gray-700">
            Sources
          </h3>

          <div className="space-y-3">

            {message.sources.map((source, index) => (
              <SourceCard
                key={index}
                source={source}
              />
            ))}

          </div>

        </div>

      )}

    </div>
  );
}