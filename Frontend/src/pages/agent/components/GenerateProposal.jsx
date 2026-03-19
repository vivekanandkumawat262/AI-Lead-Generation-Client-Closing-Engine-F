import { apiFetch } from "../../../api/api";

const GenerateProposal = ({ leadId, onSuccess }) => {
  const handleGenerate = async () => {
    try {
      // 1️⃣ Generate proposal
      await apiFetch(`/proposals/${leadId}`, {
        method: "POST",
      });

      // 2️⃣ Re-fetch lead from backend
      const freshLead = await apiFetch(`/leads/${leadId}`);

      // 3️⃣ Update parent state
      onSuccess(freshLead);

      alert("Proposal generated successfully!");
    } catch (err) {
      console.error("Generate proposal failed:", err);
      alert(
        err?.response?.data?.detail ||
          err?.message ||
          "Failed to generate proposal"
      );
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <button
        onClick={handleGenerate}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Generate Proposal
      </button>
    </div>
  );
};

export default GenerateProposal;
