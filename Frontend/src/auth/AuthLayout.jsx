import { Outlet } from "react-router-dom";
import ContactUsSection from "../components/ContactUs/ContactUs";
import Home from "../pages/public/Home";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Outlet />
      <Home/>
    </div>
  );
};

export default AuthLayout;
