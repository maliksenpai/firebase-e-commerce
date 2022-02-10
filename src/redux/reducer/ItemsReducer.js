import { createSlice } from "@reduxjs/toolkit";
import {getItems} from "../action/ItemsActions";

const initialState = {
  items: [],
  loading: null,
  selectedItem: null
};

export const itemsReducer = createSlice({
  name: "itemsReducer",
  initialState: initialState,
  reducers:{},
  extraReducers: (builder => {
    builder.addCase(getItems.pending, (state, action) =>{
      const copyState = {...state};
      copyState.loading = true;
      copyState.items = [];
      copyState.selectedItem = null;
      return copyState;
    })
    builder.addCase(getItems.fulfilled, (state, action) =>{
      const copyState = {...state};
      copyState.loading = false;
      copyState.items = action.payload.response;
      return copyState;
    });
  })
})