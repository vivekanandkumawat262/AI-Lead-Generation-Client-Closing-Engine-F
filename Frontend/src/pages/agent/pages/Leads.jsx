import { useEffect, useState } from "react";
import { apiFetch } from "../../../api/api";
import LeadTable from "../components/LeadTable";
import AddLeads from "../AddLeads";
function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/leads")
      .then(setLeads)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading leads...</p>;
  if (leads.length) console

  return (
    <div>
      {/* <h2 className="text-2xl font-bold mb-4">Lead</h2> */}

      {/* {leads.length === 0 ? (
        <p>No leads found</p>
      ) : (
        <ul>
            
          {leads.map((lead) => (
            <li key={lead.id}>
             {lead.status} - {lead.city}
            </li>
          ))}
        </ul>
      )} */}

      {/* <LeadTable leads={leads} /> */}
      <AddLeads/>
    </div>
  );
}

export default Leads;
