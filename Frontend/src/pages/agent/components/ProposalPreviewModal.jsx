import Modal from "../../../common/Modal";

const ProposalPreviewModal = ({ open, onClose, proposalText }) => {
  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-xl"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4">
        Proposal Preview
      </h2>

      <div className="bg-slate-50 border rounded p-4 max-h-[60vh] overflow-y-auto whitespace-pre-line text-sm">
        {proposalText}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded border"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ProposalPreviewModal;
