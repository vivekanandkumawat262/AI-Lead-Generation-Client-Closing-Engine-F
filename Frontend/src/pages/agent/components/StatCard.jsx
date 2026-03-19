const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
};

export default StatCard;
