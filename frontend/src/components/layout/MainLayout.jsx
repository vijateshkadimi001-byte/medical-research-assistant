import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({

  uploadedFile,
  handleUploadSuccess,

  conversations,
  selectedConversation,
  onConversationSelect,
  onNewConversation,
  onDeleteConversation,

  children,

}) {

  return (

    <div className="min-h-screen bg-slate-100">

      <Header />

      <div className="mx-auto flex max-w-[1700px] gap-6 p-6">

        <Sidebar

          uploadedFile={uploadedFile}
          onUploadSuccess={handleUploadSuccess}

          conversations={conversations}
          selectedConversation={selectedConversation}
          onConversationSelect={onConversationSelect}
          onNewConversation={onNewConversation}
          onDeleteConversation={onDeleteConversation}

        />

        <main className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {children}
        </main>

      </div>

    </div>

  );

}