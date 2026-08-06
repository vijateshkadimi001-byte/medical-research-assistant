import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/auth/register", {
        username,
        password,
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Panel */}

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

      {/* Right Panel */}

      <div className="flex items-center justify-center bg-slate-100 p-8">

        <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">

          <h2 className="text-3xl font-bold text-center">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Register to continue
          </p>

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            <input
              className="w-full rounded-xl border p-3"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              className="w-full rounded-xl border p-3"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              className="w-full rounded-xl border p-3"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center mt-6">
            Already have an account?

            <Link
              to="/"
              className="ml-2 text-blue-600 font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}