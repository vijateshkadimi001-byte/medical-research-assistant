import { FileText } from "lucide-react";

export default function SourceCard({ source }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-white">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

          <FileText
            size={18}
            className="text-blue-600"
          />

          <h4 className="font-semibold text-slate-800">
            {source.source}
          </h4>

        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          Page {source.page}
        </span>

      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {source.preview}
      </p>

    </div>
  );
}