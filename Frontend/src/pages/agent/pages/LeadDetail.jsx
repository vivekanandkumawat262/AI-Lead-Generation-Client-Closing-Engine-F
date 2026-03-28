import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../api/api";

import LeadActionsHeader from "../components/LeadActionsHeader";
import LeadInfoCard from "../components/LeadInfoCard";
import EmailOutreach from "../components/EmailOutreach";
import StatusUpdate from "../components/StatusUpdate";
import Leads from "../AddLeads";
import ReplyIntentSimulator from "../components/leads/ReplyIntentSimulator";
import GenerateProposal from "../components/GenerateProposal";
import ProposalStatusCard from "../components/ProposalStatusCard";
import ViewProposalButton from "../components/ViewProposalButton";
import PayNowButton from "../components/PayNowButton";

function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshLead = async () => {
    try {
      const updatedLead = await apiFetch(`/leads/${id}`);
      setLead(updatedLead);
    } catch (err) {
      console.error("Failed to refresh lead:", err);
    }
  };

  useEffect(() => {
    apiFetch(`/leads/${id}`)
      .then(setLead)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading lead...</p>;
  if (!lead) return <p>Lead not found</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <LeadActionsHeader businessName={lead.business_name} />

      <LeadInfoCard lead={lead} />

      <StatusUpdate lead={lead} onUpdate={setLead} />

      {lead.status === "NEW" && (
        <EmailOutreach leadId={lead.id} onStatusChange={setLead} />
      )}

      {lead.status === "CONTACTED" && (
        <ReplyIntentSimulator
          leadId={lead.id}
          onStatusUpdate={(newStatus) =>
            setLead({ ...lead, status: newStatus })
          }
        />
      )}

      {/* 🔥 AI Reply Component */}
      {lead.status === "INTERESTED" && (
        <div className="bg-slate-50 p-4 rounded">
          <h3 className="font-semibold">Lead is Interested</h3>

          <GenerateProposal
            leadId={lead.id}
            onSuccess={(updatedLead) => setLead(updatedLead)}
          />
        </div>
      )}

      <ProposalStatusCard lead={lead} />

      <div className="space-y-4">
        {lead.status === "INTERESTED" && (
          <GenerateProposal leadId={lead.id} onSuccess={refreshLead} />
        )}

        {lead.status === "PROPOSAL_SENT" && (
          <ViewProposalButton leadId={lead.id} />
        )}
      </div>

      {lead.status === "PROPOSAL_SENT" && <PayNowButton leadId={lead.id} />}

      {lead.status === "PAID" ? (
        <div className="text-green-600 font-semibold">✅ Payment Completed</div>
      ) : (
        <PayNowButton leadId={lead.id} />
      )}

      
    </div>
  );
}

export default LeadDetails;
