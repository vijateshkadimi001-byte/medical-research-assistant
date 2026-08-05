import { HeartPulse, LogOut, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-blue-600 p-3 text-white shadow-md">
          <HeartPulse size={26} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            MedIntel
          </h1>

          <p className="text-sm text-slate-500">
            AI Medical Research Assistant
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-2">
          <UserCircle2 className="text-blue-600" size={24} />

          <div>
            <p className="text-xs text-slate-500">
              Welcome back
            </p>

            <p className="font-semibold text-slate-800">
              {username}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}