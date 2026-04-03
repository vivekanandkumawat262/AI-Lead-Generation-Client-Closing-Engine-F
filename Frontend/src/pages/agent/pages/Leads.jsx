import { useEffect, useState } from "react";
import { apiFetch } from "../../../app/api";
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
      <AddLeads/>
    </div>
  );
}

export default Leads;
