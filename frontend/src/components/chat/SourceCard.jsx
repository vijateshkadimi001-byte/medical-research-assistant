export default function SourceCard({ source }) {
  return (
    <div className="rounded-lg border bg-slate-50 p-3">

      <div className="flex items-center justify-between">

        <h4 className="font-semibold">
          {source.source}
        </h4>

        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
          Page {source.page}
        </span>

      </div>

      <p className="mt-2 text-sm text-gray-600">
        {source.preview}
      </p>

    </div>
  );
}