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

       {lead.status === "NEW" && (
        <EmailOutreach leadId={lead.id} onStatusChange={setLead} />
       )}

      <StatusUpdate lead={lead} onUpdate={setLead} />
       
        <h1 className="text-2xl font-bold mb-2">
        {lead.business_name}
      </h1>

      <p className="text-slate-600">{lead.email}</p>
      <p className="text-sm mt-1">
        Status: <strong>{lead.status}</strong>
      </p>
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
        <GenerateProposal
          leadId={lead.id}
          onSuccess={refreshLead}
        />
      )}

      {lead.status === "PROPOSAL_SENT" && (
        <ViewProposalButton leadId={lead.id} />
      )}
    </div>     


{lead.status === "PROPOSAL_SENT" && (
  <PayNowButton leadId={lead.id} />
)} 
 

      
  
 

     



    </div>
  );
}

export default LeadDetails;




// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { apiFetch } from "../../../api/api";

// function LeadDetails() {
  
//   const [emailDraft, setEmailDraft] = useState(null);
//   const [sending, setSending] = useState(false);
//   const [generating, setGenerating] = useState(false);
  
//   const { id } = useParams();        // 👈 gets lead id from URL
//   const navigate = useNavigate();
  
//   const [lead, setLead] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     apiFetch(`/leads/${id}`)
//       .then((data) => setLead(data))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <p>Loading lead...</p>;
//   if (!lead) return <p>Lead not found</p>;

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
      
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">
//           {lead.business_name}
//         </h2>

//         <button
//           onClick={() => navigate(-1)}
//           className="text-sm text-slate-600 hover:underline"
//         >
//           ← Back
//         </button>
//       </div>

//       {/* Lead Info */}
//       <div className="bg-white p-6 rounded-xl shadow space-y-2">
//         <p><strong>Email:</strong> {lead.email}</p>
//         <p><strong>Industry:</strong> {lead.industry}</p>
//         <p><strong>City:</strong> {lead.city}</p>
//         <p>
//           <strong>Status:</strong>{" "}
//           <span className="px-2 py-1 rounded bg-orange-100 text-orange-600 text-sm">
//             {lead.status}
//           </span>
//         </p>
//       </div>

//       {/* Actions */}
//       <div className="bg-white p-6 rounded-xl shadow space-y-4">
//         <h3 className="text-lg font-semibold">Actions</h3>

//         <button
//           className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600"
//           onClick={() => handleSendEmail(lead.id)}
//         >
//           Send AI Email
//         </button>

//         <button
//           className="px-4 py-2 rounded border border-slate-300 hover:bg-slate-100"
//           onClick={() => handleStatusUpdate("Interested")}
//         >
//           Mark as Interested
//         </button>
//       </div>
//     </div>
//   );

//   // ---------- ACTION HANDLERS ----------
//   async function handleSendEmail(leadId) {
//     try {
//       await apiFetch("/agent/send-email", {
//         method: "POST",
//         body: { lead_id: leadId },
//       });
//       alert("Email sent successfully");
//     } catch (err) {
//       alert("Failed to send email");
//     }
//   }

//   async function handleStatusUpdate(status) {
//     try {
//       const updated = await apiFetch(`/agent/leads/${id}`, {
//         method: "PATCH",
//         body: { status },
//       });
//       setLead(updated);
//     } catch (err) {
//       alert("Failed to update status");
//     }
//   }
// }

// export default LeadDetails;
