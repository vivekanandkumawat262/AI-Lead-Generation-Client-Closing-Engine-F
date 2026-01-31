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

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import Modal from "./Model"; // same Modal component
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('')
//   const { setUser } = useAuth();
  
   

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
     
//     setUser({username, password});  // Set the username in context

//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/auth/login",
//         { email, password }
//       );

//       const data = res.data;
      
//       // Save auth data
//       localStorage.setItem("token", data.access_token);
//       localStorage.setItem("role", data.role);
//       localStorage.setItem("username", username); // Save username to localStorage
//       localStorage.setItem("password", password); // Save password to localStorage

//       // Redirect based on role
//       if (data.role === "ADMIN") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/agent/dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.detail || "Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal onClose={() => navigate("/")}>
//       {/* CLOSE BUTTON */}
//       <button
//         onClick={() => navigate("/")}
//         className="absolute top-4 right-4 text-xl text-slate-500 hover:text-slate-800"
//         aria-label="Close"
//       >
//         ✕
//       </button>

//       <h2 className="text-3xl font-extrabold text-slate-900 text-center">
//         Welcome back
//       </h2>

//       <p className="text-slate-600 text-sm text-center mt-2 mb-6">
//         Log in to your AI-powered dashboard
//       </p>

//       <form onSubmit={handleLogin} className="space-y-5">
//         <input
//           type="email"
//           placeholder="you@example.com"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full rounded-xl border px-4 py-3"
//         />

//         <input
//           type="text"
//           placeholder="Username"
//           required
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full rounded-xl border px-4 py-3"
//         />

//         <input
//           type="password"
//           placeholder="Your password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full rounded-xl border px-4 py-3"
//         />

//         {error && <p className="text-red-600 text-sm">{error}</p>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-xl bg-orange-500 py-3 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-60"
//         >
//           {loading ? "Signing in..." : "Login"}
//         </button>
//       </form>

//       <p className="text-center text-sm mt-6">
//         Don’t have an account?{" "}
//         <Link to="/signup" className="text-orange-500 font-semibold">
//           Sign up
//         </Link>
//       </p>
//     </Modal>
//   );
// };

// export default Login;


// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:8000/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.detail || "Invalid credentials");
//       }

//       // Save auth data
//       localStorage.setItem("token", data.access_token);
//       localStorage.setItem("role", data.role);

//       // Redirect based on role
//       if (data.role === "ADMIN") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/agent/dashboard");
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
//       {/* Header */}
//       <div className="text-center mb-6">
//         <h2 className="text-3xl font-extrabold text-slate-900">
//           Welcome back
//         </h2>
//         <p className="text-slate-600 text-sm mt-2">
//           Log in to your AI lead dashboard
//         </p>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleLogin} className="space-y-5">
//         <input
//           type="email"
//           placeholder="Email address"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full rounded-xl border border-slate-300 px-4 py-3
//                      focus:outline-none focus:ring-2 focus:ring-orange-500"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full rounded-xl border border-slate-300 px-4 py-3
//                      focus:outline-none focus:ring-2 focus:ring-orange-500"
//         />

//         {error && (
//           <p className="text-red-600 text-sm text-center">{error}</p>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-xl bg-orange-500 py-3 text-white font-semibold
//                      hover:bg-orange-600 transition disabled:opacity-60"
//         >
//           {loading ? "Signing in..." : "Login"}
//         </button>
//       </form>

//       {/* Footer */}
//       <p className="text-center text-sm text-slate-600 mt-6">
//         Don’t have an account?{" "}
//         <Link
//           to="/signup"
//           className="text-orange-500 font-semibold hover:underline"
//         >
//           Sign up
//         </Link>
//       </p>
      
//     </div>
//   );
// }
