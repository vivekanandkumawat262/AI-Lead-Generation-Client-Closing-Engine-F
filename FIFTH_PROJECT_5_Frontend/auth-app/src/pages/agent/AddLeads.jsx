import { useEffect, useState } from "react";
import { apiFetch } from "../../api/api";
import LeadTable from "./components/LeadTable";
import CreateLeadModal from "./components/CreateLeadModal";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load from localStorage first + then API
  useEffect(() => {
    const storedLeads = localStorage.getItem("leads");

    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    }

    apiFetch("/leads")
      .then((data) => {
        if (Array.isArray(data)) {
          setLeads(data);
          localStorage.setItem("leads", JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch leads:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Save new lead to state + localStorage
  const handleSuccess = (newLead) => {
    setLeads((prev) => {
      const updated = [newLead, ...prev];
      localStorage.setItem("leads", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Leads</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Lead
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading leads...</p>
      ) : (
        <LeadTable leads={leads} />
      )}

      {showModal && (
        <CreateLeadModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}

export default Leads;


// import { useEffect, useState } from "react";
// import { apiFetch } from "../../api/api";
// import LeadTable from "./components/LeadTable";
// import CreateLeadModal from "./components/CreateLeadModal";

// function Leads() {
//   const [leads, setLeads] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     apiFetch("/leads").then(setLeads);
//   }, []);

//   return (
//     <div className="space-y-6">
      
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Leads</h2>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-orange-500 text-white px-4 py-2 rounded-lg"
//         >
//           + Add Lead
//         </button>
//       </div>

//       <LeadTable leads={leads} />

//       {showModal && (
//         <CreateLeadModal
//           onClose={() => setShowModal(false)}
//           onSuccess={(newLead) => setLeads((prev) => [newLead, ...prev])}
//         />
//       )}
//     </div>
//   );
// }

// export default Leads;
