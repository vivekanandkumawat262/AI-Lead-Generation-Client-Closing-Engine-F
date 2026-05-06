import { useEffect, useState } from "react";
<<<<<<< HEAD
import { apiFetch } from "../../../api/api";
=======
import { apiFetch } from "../../../app/api";
>>>>>>> b87aec80181b986af2a46060389d487668364994
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
