const LeadStatusBadge = ({ status }) => {
  const colors = {
    NEW: "bg-gray-400",
    CONTACTED: "bg-blue-500",
    INTERESTED: "bg-green-500",
    PROPOSAL_SENT: "bg-purple-500",
    PAID: "bg-emerald-600",
    NOT_INTERESTED: "bg-red-500",
  };

  return (
    <span
      className={`px-3 py-1 text-xs text-white rounded-full ${
        colors[status] || "bg-slate-400"
      }`}
    >
      {status || "UNKNOWN"}
    </span>
  );
};

export default LeadStatusBadge;
