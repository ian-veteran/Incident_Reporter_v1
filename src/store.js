import { configureStore } from "@reduxjs/toolkit";
import incidentReducer from "./features/report/incidentSlice";
import incidentSlice from "./slice/incidentSlice";

const store = configureStore({
  reducer: {
    incidents: incidentReducer,
    incident: incidentSlice,
  },
});

export default store;
