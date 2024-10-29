import { createSlice } from "@reduxjs/toolkit";

const incidentSlice = createSlice({
  name: "incident",
  initialState: {
    incidents: [], // Store multiple incidents in an array
  },
  reducers: {
    addIncident(state, action) {
      state.incidents.push(action.payload); // Add a new incident to the array
    },
    setIncidents(state, action) {
      state.incidents = action.payload; // Set multiple incidents from the fetched data
    },
  },
});

export const selectIncidentCount = (state) => state.incident.incidents.length;

export const { addIncident, setIncidents } = incidentSlice.actions;
export default incidentSlice.reducer;
