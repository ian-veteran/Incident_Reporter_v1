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
    viewedIncidents: {}, // Initialize viewedIncidents as an empty object
  },
  reducers: {
    addIncident(state, action) {
      state.incidents.unshift(action.payload);
    },
    setIncidents(state, action) {
      state.incidents = action.payload;
    },
    markIncidentAsViewed(state, action) {
      const id = action.payload;
      state.viewedIncidents[id] = true; // Mark incident as viewed by setting its ID in the object
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
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

export const selectUnreadCount = (state) => 
  state.incident.incidents.filter(incident => !state.incident.viewedIncidents[incident.id]).length;
export const selectViewedIncidents = (state) => state.incident.viewedIncidents;
export const selectIncidentCount = (state) => state.incident.incidents.length;
export const selectFloodIncidentCount = (state) =>
  state.incident.incidents.filter((incident) => incident.type === "Flood").length;

export const { addIncident, setIncidents, markIncidentAsViewed } = incidentSlice.actions;
export default incidentSlice.reducer;
