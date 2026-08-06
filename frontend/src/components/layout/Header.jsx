import {
  HeartPulse,
  LogOut,
  UserCircle2,
  ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">

      <div className="mx-auto flex h-20 max-w-[1700px] items-center justify-between px-8">

        {/* Logo */}

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-3 text-white shadow-lg">

            <HeartPulse size={28} />

          </div>

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              MedIntel
            </h1>

            <div className="mt-1 flex items-center gap-2">

              <ShieldCheck
                size={14}
                className="text-emerald-500"
              />

              <span className="text-sm text-slate-500">
                AI Medical Research Assistant
              </span>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">

            <UserCircle2
              size={32}
              className="text-blue-600"
            />

            <div>

              <p className="text-xs text-slate-500">
                Logged in as
              </p>

              <p className="font-semibold text-slate-800">
                {user?.username || "Admin"}
              </p>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-5 py-3 font-medium text-white transition-all hover:bg-red-600 hover:shadow-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}