import { useNavigate } from "react-router-dom";

const LeadActionsHeader = ({ businessName }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{businessName}</h1>
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-slate-600 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default LeadActionsHeader;
