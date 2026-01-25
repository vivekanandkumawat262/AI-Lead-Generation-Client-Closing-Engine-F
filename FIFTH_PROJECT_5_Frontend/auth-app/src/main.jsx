import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from 'react-redux'
import {store} from './app/store'

import AgentDashboard from "./pages/agent/pages/AgentDashboard";
import LeadDetails from "./pages/agent/pages/LeadDetail";
import EmailComposer from "./pages/agent/pages/EmailComposer";
import Activity from "./pages/agent/pages/Activity";
import Settings from "./pages/agent/pages/Settings";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

/* Layout */
import Layout from "./layout";

/* Public Pages */
import HomePage from "./pages/public/Home";
import Product from "./components/Product/Product";
import Solutions from "./components/Pricing/Pricing";
import Technology from "./components/Technology/Technology";
import ContactUs from "./components/ContactUs/ContactUs";

/* Auth Pages */
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import LogoutButton from "./auth/Logout";

/* Dashboards */
import AdminDashboard from "./pages/admin/AdminDashboard";
  
import Leads from "./pages/agent/pages/Leads";

/* Route Guards */
import ProtectedRoute from "./components/ProtectedRoute";
import PrivateRoute from "./auth/PrivateRoute";
import Pricing from "./components/Pricing/Pricing";
import AuthLayout from "./auth/AuthLayout";
import AgentLayout from "./pages/agent/Layout/AgentLayout";
import Github, { githubInfoLoader } from "./components/Github/Github";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,   // Header + Footer here
    children: [

      /* ---------- PUBLIC ROUTES ---------- */
      { path: "/", element: <HomePage /> },
      { path: "/product", element: <Product /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/technology", element: <Technology /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/github", element: <Github />, loader: githubInfoLoader },
      
       // AUTH PAGES (NO HEADER/FOOTER)
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
        ],
      },

      /* ---------- AUTH ROUTES ---------- */
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/logout", element: <LogoutButton /> },

      /* ---------- PRIVATE ROUTES ---------- */
       

      /* ---------- ADMIN ROUTES ---------- */
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },

      /* ---------- AGENT ROUTES ---------- */
      {
        path: "/agent",
        element: (
          <ProtectedRoute allowedRoles={["AGENT"]}>
            <AgentLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <AgentDashboard /> },
          { path: "leads", element: <Leads /> },
          { path: "leads/:id", element: <LeadDetails /> },
          { path: "email", element: <EmailComposer /> },
          { path: "activity", element: <Activity /> },
          { path: "settings", element: <Settings /> },
        ],
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
