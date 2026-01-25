import { useState } from "react";
import { apiFetch } from "../../../api/api";
import ProposalPreviewModal from "./ProposalPreviewModal";

const ViewProposalButton = ({ leadId }) => {
  const [open, setOpen] = useState(false);
  const [proposalText, setProposalText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleView = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(`/proposals/${leadId}`);
      setProposalText(res.content);
      setOpen(true);
    } catch (err) {
      console.error(err);
      alert("Failed to load proposal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleView}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Loading..." : "View Proposal"}
      </button>

      <ProposalPreviewModal
        open={open}
        onClose={() => setOpen(false)}
        proposalText={proposalText}
      />
    </>
  );
};

export default ViewProposalButton;
