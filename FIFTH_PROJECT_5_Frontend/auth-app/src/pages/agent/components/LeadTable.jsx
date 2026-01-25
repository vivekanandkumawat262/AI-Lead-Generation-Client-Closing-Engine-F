import { Link } from "react-router-dom";
import LeadStatusBadge from "./LeadStatusBadge";

const LeadTable = ({ leads = [] }) => {
  console.log(leads)
  return (
    <table className="w-full bg-white rounded-xl shadow overflow-hidden">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-3 text-left">Business</th>
          <th className="p-3 text-left">Email</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Action</th>
        </tr>
      </thead>

      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id} className="border-t">
            <td className="p-3">{lead.business_name || "—"}</td>
            <td className="p-3">{lead.email}</td>
            <td className="p-3">
              <LeadStatusBadge status={lead.status} />
            </td>
            <td className="p-3">
              <Link
                to={`/agent/leads/${lead.id}`}
                className="text-orange-500 hover:underline"
              >
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeadTable;
