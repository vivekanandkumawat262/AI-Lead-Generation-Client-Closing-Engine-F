import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "./Model";

const Signup = ({ onClose = () => {} }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [agency_name, setAgency_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://ai-lead-generation-client-closing-engine-ni15.onrender.com/auth/register",
        { username,agency_name,email, password }
      );

      setMessage(res.data.message || "Account created successfully!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal  onClose={() => navigate("/")}>
      {/* CLOSE BUTTON */}
     <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 text-xl"
      >
        ✕
      </button>

      <h2 className="text-3xl font-extrabold text-slate-900 text-center">
        Create your account
      </h2>

      <p className="text-slate-600 text-sm text-center mt-2 mb-6">
        Start closing clients with AI-powered automation
      </p>

      <form onSubmit={handleSignup} className="space-y-5">
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-xl border px-4 py-3"
        />
        <input
          type="text"
          placeholder="Your Agency Name"
          required
          value={agency_name}
          onChange={(e) => setAgency_name(e.target.value)}
          className="w-full rounded-xl border px-4 py-3"
        />
        <input
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border px-4 py-3"
        />

        <input
          type="password"
          placeholder="Create a strong password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border px-4 py-3"
        />

        {message && <p className="text-green-600 text-sm">{message}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-orange-500 py-3 text-white font-semibold"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-orange-500 font-semibold">
          Log in
        </Link>
      </p>
    </Modal>
  );
};

export default Signup;
