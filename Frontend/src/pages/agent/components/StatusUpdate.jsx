import { apiFetch } from "../../../api/api";

const statuses = [
  "NEW",
  "CONTACTED",
  "INTERESTED",
  "NOT_INTERESTED",
  "PROPOSAL_SENT",
  "PAID",
  "CLOSED",
];

const StatusUpdate = ({ lead, onUpdate }) => {
  async function updateStatus(status) {
    try {
      // 1️⃣ Update status in backend
      await apiFetch(`/leads/${lead.id}`, {
        method: "PATCH",
        body: { status },
      });

      // 2️⃣ Re-fetch full lead from backend
      const freshLead = await apiFetch(`/leads/${lead.id}`);

      // 3️⃣ Update parent state with real lead
      onUpdate(freshLead);
    } catch (err) {
      console.error("Status update failed:", err);
      alert(
        err?.response?.data?.detail ||
          err?.message ||
          "Failed to update status"
      );
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-3">
      <h3 className="text-lg font-semibold">Update Status</h3>

      <div className="flex gap-3 flex-wrap">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => updateStatus(status)}
            className={`px-4 py-2 rounded border ${
              lead.status === status
                ? "bg-orange-500 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusUpdate;
