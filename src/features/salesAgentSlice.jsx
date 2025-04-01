import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://lead-sync-backend.vercel.app/agents";

// Fetch all sales agents
export const fetchSalesAgents = createAsyncThunk(
  "salesAgents/fetchSalesAgents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseUrl);
      //   console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch sales agents"
      );
    }
  }
);

// Add a new sales agent
export const addSalesAgent = createAsyncThunk(
  "salesAgents/addSalesAgent",
  async (agentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl, agentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add sales agent"
      );
    }
  }
);

export const salesAgentSlice = createSlice({
  name: "salesAgents",
  initialState: {
    agents: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesAgents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSalesAgents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.agents = action.payload;
      })
      .addCase(fetchSalesAgents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addSalesAgent.fulfilled, (state, action) => {
        state.agents.push(action.payload);
      })
      .addCase(addSalesAgent.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default salesAgentSlice.reducer;
