import { Upload, FileUp } from "lucide-react";

export default function UploadCard({
  selectedFile,
  handleFileChange,
  handleUpload,
  loading,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-3">
          <Upload className="text-blue-600" size={22} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">
            Upload Medical PDF
          </h3>

          <p className="text-sm text-slate-500">
            Supports PDF documents
          </p>
        </div>
      </div>

      <div className="mt-5">

        <label
          htmlFor="pdf-upload"
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-6 transition hover:border-blue-500 hover:bg-slate-50"
        >
          <FileUp className="mb-3 text-slate-400" size={34} />

          <p className="font-medium text-slate-700">
            Click to choose a PDF
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Medical research papers only
          </p>

          <input
            id="pdf-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

      </div>

      {selectedFile && (
        <div className="mt-4 rounded-lg bg-slate-100 p-3">
          <p className="text-sm font-medium text-slate-700">
            Selected File
          </p>

          <p className="mt-1 break-all text-sm text-blue-600">
            {selectedFile.name}
          </p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {loading ? "Uploading..." : "Upload & Index Document"}
      </button>

    </div>
  );
}