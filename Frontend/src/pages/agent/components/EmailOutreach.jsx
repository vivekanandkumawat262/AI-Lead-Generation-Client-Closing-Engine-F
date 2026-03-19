import { useState } from "react";
import { apiFetch } from "../../../api/api";


const EmailOutreach = ({ leadId, onStatusChange }) => {
  const [draft, setDraft] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);

  async function generateEmail() {
    setGenerating(true);
    try {
      const data = await apiFetch(`/ai/email?lead_id=${leadId}`, {
        method: "POST",
      });
      setDraft(data);
    } catch {
      alert("Failed to generate email");
    } finally {
      setGenerating(false);
    }
  }

  async function sendEmail() {
    setSending(true);
    try {
      const res = await apiFetch(`/outreach/send?lead_id=${leadId}`, {
        method: "POST",
        body: draft,
      });

      alert(res.message);
      onStatusChange((prev) => ({ ...prev, status: res.status }));
      setDraft(null);
    } catch {
      alert("Failed to send email");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h3 className="text-lg font-semibold">Email Outreach</h3>

      {!draft && (
        <button
          onClick={generateEmail}
          disabled={generating}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          {generating ? "Generating..." : "Generate AI Email"}
        </button>
      )}

      {draft && (
        <>
          <input
            value={draft.subject}
            onChange={(e) =>
              setDraft({ ...draft, subject: e.target.value })
            }
            className="w-full border rounded p-2"
          />

          <textarea
            rows={8}
            value={draft.body}
            onChange={(e) =>
              setDraft({ ...draft, body: e.target.value })
            }
            className="w-full border rounded p-2"
          />

          <button
            onClick={sendEmail}
            disabled={sending}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {sending ? "Sending..." : "Send Email"}
          </button>
        </>
      )}
    </div>
  );
};

export default EmailOutreach;
