import {createSlice} from "@reduxjs/toolkit";
import {addCartItem, removeCartItem} from "../action/CartActions";

const initialState = {
  cart: [],
  totalPrice: 0,
  itemCount: 0,
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState: initialState,
  reducers: {
    addCartItem: addCartItem,
    removeCartItem: removeCartItem,
    clear: () => {
      return {...initialState}
    }
  },
  extraReducer: builder => {

  }
})