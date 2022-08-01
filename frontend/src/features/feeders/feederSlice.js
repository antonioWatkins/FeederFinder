import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import feederService from './feederService'


const initialState = {
  feeder: [],
  feederToUpdate: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message:''
}

export const createFeeder = createAsyncThunk('feeder/create', async (feederData, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token
    return await feederService.createFeeder(feederData, token)
    
} catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
}
})

export const getFeeder = createAsyncThunk('feeder/getAll', async (_, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token
    return await feederService.getFeeder(token)
  } catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getFeederID = createAsyncThunk('feeder/getID', async (id, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token
    return await feederService.getFeederID(id, token)
  } catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteFeeder = createAsyncThunk('feeder/delete', async (id, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token
    return await feederService.deleteFeeder(id, token)
    
} catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
}
})

export const updateFeeder = createAsyncThunk('feeder/update', async ({ id, feederData }, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token
    return await feederService.updateFeeder(id, feederData, token)
} catch(error){
    console.log(error);
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
}
})

export const feederSlice = createSlice({
  name: 'feeder',
  initialState,
  reducers:{
        reset:(state) =>{
            state.isloading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            
        }
      },
      extraReducers:(builder) => {
        builder
        .addCase(getFeeder.pending, (state) => {
          state.isLoading = true

        })
        .addCase(getFeeder.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.feeder = action.payload
     
          })
          .addCase(getFeeder.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
   
          })
    .addCase(createFeeder.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createFeeder.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.feeder.push(action.payload)
      console.log(state.feeder)
    })
    .addCase(createFeeder.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
      .addCase(deleteFeeder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteFeeder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.feeder = state.feeder.filter(
          (feeder) => feeder._id !== action.payload.id
        )
   
        })
        .addCase(deleteFeeder.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload

        })
        .addCase(updateFeeder.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateFeeder.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.feeder = state.feeder.filter(
            (feeder) => feeder._id == action.payload.id
          )
          console.log('updatefeeder success',state.feeder)
          })
          .addCase(updateFeeder.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            console.log('updatefeeder2 rejected', action)
          })
          .addCase(getFeederID.pending, (state) => {
            state.isLoading = true
            console.log('getfeederid loading',state.feeder)
          })
          .addCase(getFeederID.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.feederToUpdate = action.payload
            console.log('getfeederid success',state.feeder)
            })
            .addCase(getFeederID.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
              console.log('getfeeder rejected2 ',action.message)
            })
}
})

export const {reset} = feederSlice.actions
export default feederSlice.reducer