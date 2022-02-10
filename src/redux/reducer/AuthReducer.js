import {createSlice} from "@reduxjs/toolkit";
import {loginUser, registerUser} from "../action/AuthActions";

const initialState = {
  user: null,
  loading: false,
}

export const authReducer = createSlice({
  name: "authReducer",
  initialState: initialState,
  reducers:{
    clear: () => {
      return {...initialState}
    }
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, (state, action) => {
      const copyState = {...state}
      copyState.loading = true
      copyState.user = null
      return copyState
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const copyState = {...state}
      copyState.loading = false
      copyState.user = action.payload.response
      return copyState
    })
    builder.addCase(registerUser.pending, (state, action )=>{
      const copyState = {...state}
      copyState.loading = true
      copyState.user = null
      return copyState
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const copyState = {...state}
      copyState.loading = false
      copyState.user = action.payload.response
      return copyState
    })
  }
})