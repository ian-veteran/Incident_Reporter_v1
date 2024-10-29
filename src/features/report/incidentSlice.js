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
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in.
    // Payload of the FULFILLED state
    return { position, address };
  }
);

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
