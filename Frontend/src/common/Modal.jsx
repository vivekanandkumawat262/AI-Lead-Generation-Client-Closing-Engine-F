import { useEffect } from "react";

const Modal = ({ children, onClose }) => {
  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* MODAL BOX */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 animate-fadeIn">
        {children}
      </div>
    </div>
  );
};

export default Modal;
