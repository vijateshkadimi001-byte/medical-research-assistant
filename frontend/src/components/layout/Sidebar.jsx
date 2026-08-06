import { useState } from "react";
import toast from "react-hot-toast";
import {
  FileText,
  ShieldCheck,
  BrainCircuit,
  CircleCheckBig,
  Plus,
} from "lucide-react";

import UploadCard from "../upload/UploadCard";
import ConversationList from "../chat/ConversationList";

import { uploadPDF, deletePDF } from "../../services/uploadService";
export default function Sidebar({
  uploadedFile,
  onUploadSuccess,

  conversations,
  selectedConversation,
  onConversationSelect,
  onNewConversation,
  onDeleteConversation,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF first.");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadPDF(selectedFile);

      onUploadSuccess(response.filename);

      setSelectedFile(null);

      toast.success("Medical document uploaded successfully.");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.detail ||
        "Failed to upload document."
      );
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeletePDF = async () => {
  try {
    await deletePDF();

    onUploadSuccess(null);

    setSelectedFile(null);

    toast.success("Document removed successfully.");

  } catch (err) {

    console.error(err);

    toast.error(
      err.response?.data?.detail ||
      "Failed to remove document."
    );
  }
};

  return (
    <aside className="flex h-full w-80 flex-col border-r border-slate-200 bg-white p-6">

      {/* New Chat */}
      <button
        onClick={onNewConversation}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        New Chat
      </button>

      {/* Conversation History */}
      <div className="mb-6 flex-1 overflow-y-auto">

        <h2 className="mb-4 text-lg font-bold text-slate-800">
          Conversations
        </h2>

        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelect={onConversationSelect}
          onDelete={onDeleteConversation}
        />

      </div>

      {/* Uploaded File */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">

        <div className="flex items-start gap-3">

          <FileText
            size={24}
            className="text-blue-600"
          />

          <div className="flex-1">

            <p className="break-all font-medium text-slate-800">
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
                <button
                 onClick={handleDeletePDF}
                 className="mt-3 text-sm font-medium text-red-600 hover:text-red-700"
             >
              🗑 Remove Document
             </button>
              </>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                Upload a PDF to enable document search.
              </p>
            )}

          </div>

        </div>

      </div>

      {/* Upload */}
      <div className="mt-6">

        <UploadCard
          selectedFile={selectedFile}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          loading={loading}
        />

      </div>

      {/* System Status */}
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
              AI Connected
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