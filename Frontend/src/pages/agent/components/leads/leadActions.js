import { getLeads } from "../../../services/agentApi";
import { setLeads } from "./leadSlice";

export const fetchLeads = () => async (dispatch) => {
  const response = await getLeads();
  dispatch(setLeads(response.data));
};
