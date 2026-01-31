import jsPDF from "jspdf";

const DownloadProposalPDF = ({ proposal, lead }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(11);

    const title = `Proposal for ${lead.business_name}`;
    const body = proposal || "No proposal content";

    doc.text(title, 10, 15);
    doc.line(10, 18, 200, 18);
    doc.text(body, 10, 30, { maxWidth: 180 });

    doc.save(`Proposal-${lead.business_name}.pdf`);
  };

  return (
    <button
      onClick={downloadPDF}
      className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900"
    >
      📄 Download PDF
    </button>
  );
};

export default DownloadProposalPDF;
