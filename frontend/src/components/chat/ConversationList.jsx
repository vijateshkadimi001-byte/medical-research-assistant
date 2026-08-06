import {
  MessageSquare,
  Trash2,
} from "lucide-react";

export default function ConversationList({
  conversations,
  selectedConversation,
  onSelect,
  onDelete,
}) {
  if (!conversations?.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-5 text-center">

        <MessageSquare
          className="mx-auto mb-3 text-slate-400"
          size={34}
        />

        <p className="font-medium text-slate-700">
          No conversations
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Click "New Chat" to begin.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-2">

      {conversations.map((conversation) => {

        const active =
          selectedConversation?.id === conversation.id;

        return (

          <div
            key={conversation.id}
            className={`group flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-all
            ${
              active
                ? "border-blue-500 bg-blue-50"
                : "border-transparent hover:border-slate-200 hover:bg-slate-50"
            }`}
            onClick={() => onSelect(conversation)}
          >

            <div className="flex min-w-0 items-center gap-3">

              <MessageSquare
                size={18}
                className={
                  active
                    ? "text-blue-600"
                    : "text-slate-500"
                }
              />

              <span className="truncate text-sm font-medium text-slate-800">
                {conversation.title}
              </span>

            </div>

            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(conversation.id);
                }}
                className="opacity-0 transition group-hover:opacity-100"
              >
                <Trash2
                  size={16}
                  className="text-red-500 hover:text-red-700"
                />
              </button>
            )}

          </div>

        );

      })}

    </div>
  );
}