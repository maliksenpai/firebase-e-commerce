import {createAsyncThunk} from "@reduxjs/toolkit";

export const addCartItem = (state, action) => {
  state.cart.push(action.payload.item);
  state.totalPrice = state.cart.reduce((accumulator, a) => accumulator + a.price, 0).toFixed(2);
  state.itemCount = state.cart.length;
};

export const removeCartItem = (state, action) => {
  state.cart = state.cart.filter((item) => item.id !== action.payload.item.id);
  state.totalPrice = state.cart.reduce((accumulator, a) => accumulator + a.price, 0).toFixed(2);
  state.itemCount = state.cart.length;
}

export const buyCartItems = createAsyncThunk(
  "buyCartItems",
  async ({getState}) => {
    const state = getState();
  }
)

const calculateItems = (state) => {

  return state;
}



