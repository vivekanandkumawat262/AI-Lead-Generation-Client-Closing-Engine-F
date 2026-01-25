import { useState } from "react";
import { apiFetch } from "../../../api/api";

const PayNowButton = ({ leadId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayNow = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await apiFetch(`/payments/create/${leadId}`, {
        method: "POST",
      });

      if (!res?.payment_url) {
        throw new Error("Invalid payment link response");
      }

      // 🔥 Redirect user to Stripe Checkout
      window.location.href = res.payment_url;
    } catch (err) {
      console.error("Pay Now failed:", err);

      setError(
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to create payment link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handlePayNow}
        disabled={loading}
        className={`px-4 py-2 rounded font-semibold text-white transition ${
          loading
            ? "bg-green-300 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Redirecting..." : "Pay Now"}
      </button>

      {error && (
        <p className="text-red-600 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default PayNowButton;
