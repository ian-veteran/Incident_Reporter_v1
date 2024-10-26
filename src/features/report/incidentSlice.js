import { createSlice } from "@reduxjs/toolkit";

const incidentSlice = createSlice({
  name: "incident",
  initialState: {
    incidents: [], // Initial state should be an empty array
  },
  reducers: {
    setIncidents(state, action) {
      state.incidents = action.payload; // Set incidents
    },
    addIncident(state, action) {
      state.incidents.push(action.payload); // Add a new incident to the array
    },
  },
});

// Selector to get incidents from the state
export const selectIncidents = (state) => state.incident.incidents;

export const { setIncidents, addIncident } = incidentSlice.actions; // Export addIncident
export default incidentSlice.reducer;
