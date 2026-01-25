import { useEffect } from "react";
import StatCard from "../components/StatCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../components/leads/leadActions";
import LeadStatusBadge from "../components/LeadStatusBadge";
import ReplyBox from "../components/ReplyBox";

const AgentDashboard = () => {

    const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads.list);

  useEffect(() => {
    dispatch(fetchLeads());
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Leads" value="120" />
        <StatCard title="Contacted" value="78" />
        <StatCard title="Interested" value="32" />
        <StatCard title="Closed" value="12" />
      </div>
      <div className="space-y-4">
      {leads.map((lead) => (
        <div key={lead.id} className="border p-4 rounded">
          <h3>{lead.name}</h3>
          <LeadStatusBadge status={lead.status} />
         {lead.status === "CONTACTED" && (
           <ReplyBox leadId={lead.id} />
         )}
        </div>
      ))}
    </div>
    </>
  );
};

export default AgentDashboard;
