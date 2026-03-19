import { useState } from "react";
import ProposalPreviewModal from "./ProposalPreviewModal";
import DownloadProposalPDF from "./DownloadProposalPDF";
import PayNowButton from "./PayNowButton";

const ProposalStatusCard = ({ lead, onPaid }) => {
  const [open, setOpen] = useState(false);

  if (lead.status !== "PROPOSAL_SENT") return null;

  const proposalText = lead.proposal || lead.proposal?.body;

  return (
    <div className="bg-slate-50 p-5 rounded-xl border space-y-4">
      <h3 className="font-semibold text-slate-800">📄 Proposal Sent</h3>

      <p className="text-sm text-slate-600 line-clamp-3">
        {proposalText || "Proposal generated successfully"}
      </p>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          👁 Preview
        </button>

        <DownloadProposalPDF proposal={proposalText} lead={lead} />

        <PayNowButton leadId={lead.id} onPaid={onPaid} />
      </div>

      <p className="text-green-600 font-medium">💳 Awaiting payment</p>

      <ProposalPreviewModal
        open={open}
        onClose={() => setOpen(false)}
        proposal={proposalText}
      />
    </div>
  );
};

export default ProposalStatusCard;
