import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/agent/leads"), 2500);
  }, [navigate]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="mt-3">
        Redirecting to dashboard...
      </p>
    </div>
  );
};

export default PaymentSuccess;
