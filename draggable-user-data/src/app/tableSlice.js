import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "dragTable",
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {
    onStart(state) {
      state.loading = true;
      state.error = null;
    },
    onSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    onFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { onStart, onSuccess, onFailure } = tableSlice.actions;
export default tableSlice.reducer;
