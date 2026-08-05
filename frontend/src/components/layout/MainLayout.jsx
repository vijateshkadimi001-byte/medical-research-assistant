import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({
  uploadedFile,
  handleUploadSuccess,
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-100">

      <Header />

      <div className="mx-auto flex max-w-[1700px] gap-6 p-6">

        <Sidebar
          uploadedFile={uploadedFile}
          onUploadSuccess={handleUploadSuccess}
        />

        <main className="flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {children}
        </main>

      </div>

    </div>
  );
}