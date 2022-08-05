import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import feederReducer from '../features/feeders/feederSlice';
import reportReducer from '../features/reports/reportSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    auth: authReducer,
    feeder: feederReducer,
    report: reportReducer,
  },
});
