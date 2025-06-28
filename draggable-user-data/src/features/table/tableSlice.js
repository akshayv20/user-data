import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Dummy data as fallback for broken API
const dummyData = [
  { name: "Shivang", email: "shivang@example.com", age: 30 },
  { name: "Lisa Martin", email: "lisa.martin@example.com", age: 29 },
  { name: "Emma Brown", email: "emma.brown@example.com", age: 27 },
  { name: "Neha", email: "neha@example.com", age: 28 },
  { name: "Alice Smith", email: "alice.smith@example.com", age: 32 },
  { name: "Susan Green", email: "susan.green@example.com", age: 33 },
  { name: "John Doe", email: "john.doe@example.com", age: 35 },
  { name: "David White", email: "david.white@example.com", age: 38 },
  { name: "Bob Jones", email: "bob.jones@example.com", age: 40 },
  { name: "Michael Williams", email: "michael.williams@example.com", age: 45 }
];

export const fetchTableData = createAsyncThunk(
  "table/fetchTableData",
  async () => {
    // Fallback to dummy data
    return dummyData;
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState: {
    data: [],
    columns: ["name", "email", "age"],
    status: "idle"
  },
  reducers: {
    reorderColumns: (state, action) => {
      state.columns = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTableData.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export const { reorderColumns } = tableSlice.actions;
export default tableSlice.reducer;
