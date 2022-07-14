import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import feederService from './feederService'


const initialState = {
  feeder: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message:''
}

export const createFeeder = createAsyncThunk('feeder/create', async (feederData, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token
    return await feederService.createFeeder(feederData)
    
} catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
}
})
export const feederSlice = createSlice({
name: 'feeder',
initialState,
reducers: {
  reset: (state) => initialState
},
extraReducers:(builder) => {
  builder
    .addCase(createFeeder.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createFeeder.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.feeder.push(action.payload)
    })
    .addCase(createFeeder.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
}
})

export const {reset} = feederSlice.actions
export default feederSlice.reducer