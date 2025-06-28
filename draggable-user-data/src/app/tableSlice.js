import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { dummyData } from "../Asset/data";

// Async thunk with fallback logic
export const fetchData = createAsyncThunk(
  "table/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/01238aa1-35de-4015-9add-6d3e1c5e2b30"
      );
      return response.data;
    } catch (error) {
      console.warn("Error fetching data:", error);
      return dummyData;
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default tableSlice.reducer;
