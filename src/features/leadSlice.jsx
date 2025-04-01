import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://lead-sync-backend.vercel.app";

export const fetchLeads = createAsyncThunk("leads/fetchLeads", async () => {
  try {
    const res = await axios.get(`${baseUrl}/leads`, {});
    //console.log("res.data", res.data);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
});

export const addLeads = createAsyncThunk(
  "leads/addLeads",
  async (newLead, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/leads`, newLead, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Error adding lead:", error);
      return rejectWithValue(error.response?.data || "Failed to add lead");
    }
  }
);

export const leadSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    status: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLeads.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.status = "success";
      state.leads = action.payload;
    });
    builder.addCase(fetchLeads.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error?.message;
    });

    builder
      .addCase(addLeads.pending, (state) => {
        state.status = "adding";
      })
      .addCase(addLeads.fulfilled, (state, action) => {
        state.status = "success";
        console.log(action.payload);

        state.leads.push(action.payload); // Add new lead to store
      })
      .addCase(addLeads.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default leadSlice.reducer;
