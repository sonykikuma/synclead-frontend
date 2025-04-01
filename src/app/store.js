import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "../features/leadSlice";
import { commentSlice } from "../features/commentSlice";
import { salesAgentSlice } from "../features/salesAgentSlice";

export default configureStore({
  reducer: {
    lead: leadSlice.reducer,
    comment: commentSlice.reducer,
    agents: salesAgentSlice.reducer,
  },
});
