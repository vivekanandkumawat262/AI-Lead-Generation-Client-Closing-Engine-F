import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/public/Home"; 
import Signup from "./auth/Signup";
import PrivateRoute from "./auth/PrivateRoute";
import Leads from "./pages/Leads"; 
import Login from "./auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard"; 
import AgentDashboard from "./pages/agent/pages/AgentDashboard";
import LogoutButton from "./auth/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
		   return (
		 
		       <BrowserRouter>
			       <Routes>
				      <Route path="/" element={<Home />} />
					  <Route path="/login" element={<Login />} />
			          <Route path="/signup" element={<Signup />} />

					  {/* Admin Routes */}
					  <Route 
					        path="/admin/dashboard" 
					        element={
							  <ProtectedRoute allowedRoles={['ADMIN']}>  
							      <AdminDashboard/>
							  </ProtectedRoute>
							} 
					  />

					  {/* Agent Routes */}
					  					  {/* Admin Routes */}
					  <Route 
					        path="/agent/dashboard" 
					        element={
							  <ProtectedRoute allowedRoles={['AGENT']}>  
							      <AgentDashboard/>
							  </ProtectedRoute>
							} 
					  />

					  <Route 
					        path="/leads" 
					        element={<PrivateRoute> <Leads/> </PrivateRoute>} 
					  />
					  <Route path="/logout" element={<LogoutButton />} />
					  
				   </Routes>
			   </BrowserRouter>
		   )
	   }
		   
       export default App;