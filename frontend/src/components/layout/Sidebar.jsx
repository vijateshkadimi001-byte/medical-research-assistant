import {
  FileText,
  ShieldCheck,
  BrainCircuit,
  CircleCheckBig,
} from "lucide-react";

import UploadCard from "../upload/UploadCard";

export default function Sidebar({
  uploadedFile,
  onUploadSuccess,
}) {
  return (
    <aside className="flex h-full w-80 flex-col border-r border-slate-200 bg-white p-6">

      {/* Documents */}
      <div>
        <h2 className="text-lg font-bold text-slate-800">
          Documents
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your uploaded medical documents
        </p>
      </div>

      {/* Uploaded File */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">

        <div className="flex items-start gap-3">
          <FileText
            size={24}
            className="text-blue-600"
          />

          <div className="flex-1">

            <p className="font-medium text-slate-800 break-all">
              {uploadedFile || "No document uploaded"}
            </p>

            {uploadedFile ? (
              <>
                <p className="mt-2 flex items-center gap-2 text-sm text-green-600">
                  <CircleCheckBig size={16} />
                  Indexed Successfully
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Ready for AI Search
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                Upload a PDF to begin chatting.
              </p>
            )}

          </div>
        </div>

      </div>

      {/* Upload */}
      <div className="mt-6">
        <UploadCard onUploadSuccess={onUploadSuccess} />
      </div>

      {/* Status */}
      <div className="mt-8">

        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          System Status
        </h3>

        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <ShieldCheck
              size={20}
              className="text-green-600"
            />

            <span className="text-sm text-slate-700">
              Authentication Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <BrainCircuit
              size={20}
              className="text-green-600"
            />

            <span className="text-sm text-slate-700">
              Gemini Connected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CircleCheckBig
              size={20}
              className="text-green-600"
            />

            <span className="text-sm text-slate-700">
              RAG Pipeline Ready
            </span>
          </div>

        </div>

      </div>

    </aside>
  );
}