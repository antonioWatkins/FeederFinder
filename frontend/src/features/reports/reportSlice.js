import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import reportService from '../reports/reportService'

const initialState ={
  report: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const createReport = createAsyncThunk('report/create', async (reportData, thunkAPI) => {
  try{
    const token =thunkAPI.getState().auth.user.token
    return await reportService.createReport(reportData,token)
  }catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
}
})

export const getReport = createAsyncThunk('report/getAll', async (_, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token
    return await reportService.getReport(token)
  } catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers:{
    reset: (state) => initialState
  },
  extraReducers:(builder) =>{
    builder
    .addCase(createReport.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createReport.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.report.push(action.payload)
      console.log(state.report)
    })
    .addCase(createReport.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(getReport.pending, (state) => {
      state.isLoading = true

    })
    .addCase(getReport.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.report = action.payload
 
      })
      .addCase(getReport.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload

      })
  }
})

export const {reset} = reportSlice.actions
export default reportSlice.reducer