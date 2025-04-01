import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://lead-sync-backend.vercel.app";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (leadId) => {
    try {
      const res = await axios.get(`${baseUrl}/comments/${leadId}/comments`, {});
      // console.log("res.data", res.data);
      return res?.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ leadId, commentText, author }) => {
    try {
      const res = await axios.post(`${baseUrl}/comments/${leadId}/comments`, {
        commentText,
        author: author?._id,
      });
      return res?.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = "success";
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error?.message;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      const newComment = action.payload;
      if (newComment.author && typeof newComment.author === "string") {
        newComment.author = { _id: newComment.author, name: "Unknown" };
      }
      console.log(newComment);
      state.comments.push(newComment); //adding new comment object here
    });
  },
});

export default commentSlice.reducer;
