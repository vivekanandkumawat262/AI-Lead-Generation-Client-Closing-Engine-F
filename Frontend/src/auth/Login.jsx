import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "./Model";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // const res = await axios.post("https://ai-lead-generation-client-closing-engine-ni15.onrender.com/auth/login", {
      const res = await axios.post("http://127.0.0.1:8000/auth/login", {
        email,
        password,
      });

      const data = res.data;

      // 🔥 Use AuthContext instead of localStorage directly
      login(data.access_token, data.role, data.user);

      // 🔥 Role-based redirect
      if (data.role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/agent/dashboard", { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={() => navigate("/")}>
      {/* CLOSE BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 text-xl text-slate-500 hover:text-slate-800"
        aria-label="Close"
      >
        ✕
      </button>

      <h2 className="text-3xl font-extrabold text-slate-900 text-center">
        Welcome back
      </h2>

      <p className="text-slate-600 text-sm text-center mt-2 mb-6">
        Log in to your AI-powered dashboard
      </p>

      <form onSubmit={handleLogin} className="space-y-5">
        <input
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="password"
          placeholder="Your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-500"
        />

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-orange-500 py-3 text-white font-semibold
                     hover:bg-orange-600 transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm mt-6">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-orange-500 font-semibold">
          Sign up
        </Link>
      </p>
    </Modal>
  );
};

export default Login;

 