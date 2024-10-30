import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../service/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "incident/fetchAddress",
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  }
);

const incidentSlice = createSlice({
  name: "incident",
  initialState: {
    incidents: [],
    status: "idle",
    position: {},
    address: "",
    error: "",
  },
  reducers: {
    addIncident(state, action) {
      state.incidents.unshift(action.payload);
    },
    setIncidents(state, action) {
      state.incidents = action.payload;
    },
    toggleIncidentStatus(state, action) {
      const incident = state.incidents.find(
        (inc) => inc.id === action.payload.id
      );
      if (incident) {
        incident.type =
          incident.type === "unconfirmed" ? "confirmed" : "unconfirmed";
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error = "Error fetching address!";
      }),
});

// Selectors
export const selectIncidentCount = (state) => state.incident.incidents.length;
export const selectFloodIncidentCount = (state) =>
  state.incident.incidents.filter((incident) => incident.type === "Flood")
    .length;

export const { addIncident, setIncidents, toggleIncidentStatus } =
  incidentSlice.actions;
export default incidentSlice.reducer;
