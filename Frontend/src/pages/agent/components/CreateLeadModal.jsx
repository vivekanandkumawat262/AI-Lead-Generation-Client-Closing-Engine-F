import { useState } from "react";
import { apiFetch } from "../../../api/api";

const CreateLeadModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    business_name: "",
    email: "",
    industry: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const newLead = await apiFetch("/leads", {
        method: "POST",
        body: form,
      });

      onSuccess(newLead); // 🔥 update table instantly
      onClose();
    } catch (err) {
      setError("Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-slate-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Add New Lead</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="business_name"
            placeholder="Business Name"
            required
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="industry"
            placeholder="Industry"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg"
          >
            {loading ? "Creating..." : "Create Lead"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLeadModal;
