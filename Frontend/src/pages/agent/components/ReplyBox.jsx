import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendLeadReply } from "../../../features/leads/leadSlice";

const ReplyBox = ({ leadId }) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const send = () => {
    if (!content.trim()) return;
    dispatch(sendLeadReply({ leadId, content }));
    setContent("");
  };

  return (
    <div className="flex gap-2">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type reply..."
        className="flex-1 border px-3 py-2 rounded"
      />
      <button
        onClick={send}
        className="bg-blue-600 text-white px-4 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default ReplyBox;
