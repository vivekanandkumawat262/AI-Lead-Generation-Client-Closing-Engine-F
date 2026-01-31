const LeadInfoCard = ({ lead }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-2">
      <p><strong>Email:</strong> {lead.email}</p>
      <p><strong>Industry:</strong> {lead.industry}</p>
      <p><strong>City:</strong> {lead.city}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span className="px-2 py-1 rounded bg-orange-100 text-orange-600 text-sm">
          {lead.status}
        </span>
      </p>
    </div>
  );
};

export default LeadInfoCard;
