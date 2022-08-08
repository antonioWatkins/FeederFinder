/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reportService from './reportService';

const initialState = {
  likeReport: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const likeReport = createAsyncThunk('report/liketest', async (_id, thunkAPI) => {
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

export const likeReportSlice = createSlice({
  name: 'likeReport',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(likeReport.pending, (state) => {
        state.isLoading = true;
        console.log(state, 'anything here @line 36');
      })
      .addCase(likeReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const report = state.report.find((r) => r._id === action.report);
        console.log(report, 'line 90');
        if (report.report.likes.includes(action.user)) {
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

export const { reset } = likeReportSlice.actions;
export default likeReportSlice.reducer;
