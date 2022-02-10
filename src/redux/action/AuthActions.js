import {createAsyncThunk} from "@reduxjs/toolkit";
import {signInData, signUpData} from "../../data/FirebaseAuth";

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({email, password}) => {
    const response = await signInData({email: email, password: password});
    return {
      response: response
    };
  }
)

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({email, password}) => {
    const response = await signUpData({email: email, password: password});
    return {
      response: response
    }
  }
)