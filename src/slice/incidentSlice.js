import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIncidents } from "../service/apiFetchData";

export const fetchIncidents = createAsyncThunk(
  "incidents/fetchIncidents",
  async () => {
    const response = await getIncidents();
    return response; // Ensure the response structure matches your expectations
  }
);

const incidentSlice = createSlice({
  name: "incidents",
  initialState: {
    incidents: [],
    loading: false,
    error: null,
  },
  reducers: {
    setIncidents: (state, action) => {
      state.incidents = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncidents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.loading = false;
        state.incidents = action.payload; // Store fetched incidents
      })
      .addCase(fetchIncidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error message
      });
  },
});

export const { setIncidents } = incidentSlice.actions;

export const selectIncidents = (state) => state.incidents.incidents;
export const selectLoading = (state) => state.incidents.loading;
export const selectError = (state) => state.incidents.error;

export default incidentSlice.reducer;
