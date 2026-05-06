import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
    setTimeout(() => navigate("/agent/dashboard"), 2500);
=======
    setTimeout(() => navigate("/agent/leads"), 2500);
>>>>>>> b87aec80181b986af2a46060389d487668364994
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
