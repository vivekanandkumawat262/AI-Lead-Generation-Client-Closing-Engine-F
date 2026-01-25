import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendReply, getLeads } from "../../pages/services/agentApi";

/* Load leads */
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async () => {
    const res = await getLeads();
    return res.data;
  }
);

/* Send reply */
export const sendLeadReply = createAsyncThunk(
  "leads/sendReply",
  async ({ leadId, content }) => {
    const res = await sendReply(leadId, content);
    return { leadId, ...res.data };
  }
);

const leadSlice = createSlice({
  name: "leads",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(sendLeadReply.fulfilled, (state, action) => {
        const { leadId, lead_status } = action.payload;
        const lead = state.list.find((l) => l.id === leadId);
        if (lead) {
          lead.status = lead_status;
        }
      });
  },
});

export default leadSlice.reducer;
