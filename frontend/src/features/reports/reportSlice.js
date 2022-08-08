/* eslint-disable no-underscore-dangle */
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
export const likeReport = createAsyncThunk('report/like', async (_id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    await reportService.likeReport(_id, user.token);
    return { user: user._id, report: _id };
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

        const report = state.report.find((r) => r._id === action.report);
        if (report.likes.includes(action.user)) {
          report.likes = report.likes.filter((u) => u !== action.user);
        } else {
          report.likes.push(action.user);
        }
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
