import {combineReducers} from "redux";
import {itemsReducer} from "./reducer/ItemsReducer";
import {cartReducer} from "./reducer/CartReducer";
import {authReducer} from "./reducer/AuthReducer";

export const MainReducer = combineReducers({
  itemsReducer: itemsReducer.reducer,
  cartReducer: cartReducer.reducer,
  authReducer: authReducer.reducer
})