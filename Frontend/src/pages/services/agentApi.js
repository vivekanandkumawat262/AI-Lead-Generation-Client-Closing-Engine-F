import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getLeads = () => api.get("/leads");
export const getLeadById = (id) => api.get(`/leads/${id}`);
export const sendEmail = (payload) => api.post("/email", payload);
export const sendReply = (leadId, content) => api.post(`/replies/${leadId}`, { content });

export const getActivity = () => api.get("/activity");
export const updateSettings = (payload) => api.put("/settings", payload);
