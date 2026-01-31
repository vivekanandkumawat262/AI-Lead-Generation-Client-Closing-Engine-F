import { useState } from "react";
import { apiFetch } from "../../../../api/api";

const intentColors = {
  INTERESTED: "bg-green-100 text-green-700",
  NOT_INTERESTED: "bg-red-100 text-red-700",
  MAYBE: "bg-yellow-100 text-yellow-700",
  UNKNOWN: "bg-slate-100 text-slate-700",
};

export default function ReplyIntentSimulator({ leadId, onStatusUpdate }) {
  const [reply, setReply] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeReply = async () => {
    if (!reply.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await apiFetch(`/replies/${leadId}`, {
        method: "POST",
        body: { content: reply },
      });

      setResult(data);

      // 🔁 update parent lead status
      if (onStatusUpdate) {
        onStatusUpdate(data.lead_status);
      }
    } catch (err) {
      console.error("Reply analysis failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        AI Reply Intent Analyzer
      </h3>

      <p className="text-sm text-slate-600 mb-4">
        Simulate a reply from the lead to test AI intent classification.
        <span className="block text-xs mt-1 text-orange-500">
          (Developer / Testing tool)
        </span>
      </p>

      <textarea
        rows={3}
        placeholder="Type lead reply here (e.g. 'Yes, I'm interested')"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="w-full rounded-lg border border-slate-300 p-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <button
        onClick={analyzeReply}
        disabled={loading}
        className="mt-4 inline-flex items-center justify-center rounded-lg
                   bg-orange-500 px-4 py-2 text-sm font-semibold text-white
                   hover:bg-orange-600 disabled:opacity-60"
      >
        {loading ? "Analyzing..." : "Analyze Reply"}
      </button>

      {/* Result */}
      {result && (
        <div className="mt-4 space-y-2">
          <div
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold
              ${intentColors[result.intent] || intentColors.UNKNOWN}`}
          >
            Intent: {result.intent}
          </div>

          <p className="text-sm text-slate-700">
            Lead status updated to:
            <span className="font-semibold ml-1">
              {result.lead_status}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
