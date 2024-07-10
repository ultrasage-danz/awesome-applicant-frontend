// src/store/applicantSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ApplicantState {
  data: {
    name: string;
    fun_fact: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: ApplicantState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchApplicantData = createAsyncThunk('applicant/fetchData', async () => {
  const response = await axios.get('http://localhost:3000/awesome/applicant');
  return response.data;
});

const applicantSlice = createSlice({
  name: 'applicant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicantData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicantData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchApplicantData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default applicantSlice.reducer;
