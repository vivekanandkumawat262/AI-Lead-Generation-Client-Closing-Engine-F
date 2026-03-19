import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendReply } from "../../../services/agentApi";

/* Async action */
export const sendLeadReply = createAsyncThunk(
  "leads/sendReply",
  async ({ leadId, content }) => {
    const response = await sendReply(leadId, content);
    return { leadId, ...response.data };
  }
);

const leadSlice = createSlice({
  name: "leads",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    setLeads: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLeadReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendLeadReply.fulfilled, (state, action) => {
        state.loading = false;
        const { leadId, lead_status } = action.payload;

        const lead = state.list.find((l) => l.id === leadId);
        if (lead) {
          lead.status = lead_status;
        }
      })
      .addCase(sendLeadReply.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLeads } = leadSlice.actions;
export default leadSlice.reducer;
