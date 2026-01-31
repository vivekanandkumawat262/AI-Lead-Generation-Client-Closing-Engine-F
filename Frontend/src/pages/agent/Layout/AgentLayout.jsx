import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { NavLink, Outlet } from "react-router-dom";
import Profile from "../components/Profile";

const AgentLayout = () => {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    authLogout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="font-bold text-lg mb-6">Agent Panel</h2>
        <Profile />
        <nav className="space-y-2">
            
          <button  className="block">
            <NavLink
                to="/agent/dashboard"
                            className={({ isActive }) =>
                            `transition ${
                                isActive
                                ? "text-orange-500"
                                : "text-slate-700 hover:text-slate-900"
                            }`
                            }
                        >
                            Dashboard
                        </NavLink>
          </button>
          <button  className="block">
            
          <NavLink
                to="/agent/leads"
                            className={({ isActive }) =>
                            `transition ${
                                isActive
                                ? "text-orange-500"
                                : "text-slate-700 hover:text-slate-900"
                            }`
                            }
                        >
                            Leads
                        </NavLink>
          </button>
          <button  className="block">
            
          <NavLink
                to="/agent/activity"
                            className={({ isActive }) =>
                            `transition ${
                                isActive
                                ? "text-orange-500"
                                : "text-slate-700 hover:text-slate-900"
                            }`
                            }
                        >
                            Activity
                        </NavLink>
          </button>
          <button  className="block">
            
          <NavLink
                to="/agent/settings"
                            className={({ isActive }) =>
                            `transition ${
                                isActive
                                ? "text-orange-500"
                                : "text-slate-700 hover:text-slate-900"
                            }`
                            }
                        >
                            Settings
                        </NavLink>
          </button>
          <button onClick={handleLogout} className="text-red-500">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AgentLayout;


// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext";
// import { logout } from "../../../utils/logout";

// const AgentLayout = () => {
//   const navigate = useNavigate();
//   const { logout: authLogout } = useAuth();

//   return (
//     <div className="min-h-screen flex bg-slate-100">
//       <aside className="w-64 bg-white border-r p-4 space-y-4">
//         <h2 className="text-lg font-bold">Agent Panel</h2>

//         <NavLink to="/agent/dashboard">Dashboard</NavLink>
//         <NavLink to="/agent/leads">Leads</NavLink>
//         <NavLink to="/agent/activity">Activity</NavLink>
//         <NavLink to="/agent/settings">Settings</NavLink>

//         <button
//           onClick={() => logout(authLogout, navigate)}
//           className="text-red-500 mt-4"
//         >
//           Logout
//         </button>
//       </aside>

//       <main className="flex-1 p-6">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AgentLayout;