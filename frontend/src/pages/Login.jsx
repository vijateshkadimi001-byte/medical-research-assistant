import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await login(username, password);
      navigate("/chat");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Section */}

      <div className="hidden lg:flex flex-col justify-center bg-blue-700 text-white px-16">

        <h1 className="text-5xl font-bold mb-6">
          MedIntel
        </h1>

        <p className="text-xl mb-10">
          AI Medical Research Assistant
        </p>

        <div className="space-y-5 text-lg">

          <p>🩺 Analyze Medical Research Papers</p>

          <p>🤖 AI Powered Question Answering</p>

          <p>📄 Source Citations Included</p>

          <p>🔒 Secure User Authentication</p>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex items-center justify-center bg-slate-100 p-8">

        <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">

          <h2 className="text-3xl font-bold text-center">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Login to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              className="w-full rounded-xl border p-3"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />

            <input
              className="w-full rounded-xl border p-3"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            {error && (
              <p className="text-red-600 text-sm">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

          </form>

          <p className="text-center mt-6">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-blue-600 font-semibold"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}