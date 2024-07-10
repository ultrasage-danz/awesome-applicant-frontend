// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import applicantReducer from './applicantSlice';

const store = configureStore({
  reducer: {
    applicant: applicantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
