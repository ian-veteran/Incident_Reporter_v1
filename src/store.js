import { configureStore } from '@reduxjs/toolkit';
import incidentReducer from './features/report/incidentSlice';

const store = configureStore({
  reducer: {
    incident: incidentReducer,
  },
});

export default store;
