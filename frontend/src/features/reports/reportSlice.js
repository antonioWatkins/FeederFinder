/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reportService from './reportService';

const initialState = {
  report: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createReport = createAsyncThunk('report/create', async (reportData, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await reportService.createReport(reportData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
     || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getReport = createAsyncThunk('report/getAll', async (_, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await reportService.getReport(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
     || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const likeReport = createAsyncThunk('report/like', async ({ id, userId }, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await reportService.likeReport({ id, userId }, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
     || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.report.push(action.payload);
        console.log(state.report);
      })
      .addCase(createReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.report = action.payload;
      })
      .addCase(getReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likeReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.like = action.payload;
      })
      .addCase(likeReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = reportSlice.actions;
export default reportSlice.reducer;
