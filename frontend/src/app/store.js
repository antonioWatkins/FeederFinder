import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import feederReducer from '../features/feeders/feederSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feeder: feederReducer,
  },
});
