import { createSlice } from '@reduxjs/toolkit';

const incidentSlice = createSlice({
  name: "incident",
  initialState: {
    incidents: [], // Store multiple incidents in an array
    status: "idle",
    position: {},
    address: "",
    error: "",
  },
  reducers: {
    addIncident(state, action) {
      state.incidents.unshift(action.payload); // Add a new incident to the array
    },
    setIncidents(state, action) {
      state.incidents = action.payload; // Set multiple incidents from the fetched data
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

export const selectIncidentCount = (state) => state.incident.incidents.length;

export const { addIncident, setIncidents } = incidentSlice.actions;
export default incidentSlice.reducer;
