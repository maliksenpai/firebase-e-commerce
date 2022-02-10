import {createAsyncThunk} from "@reduxjs/toolkit";
import {getItemsData} from "../../data/ItemsData";

export const getItems = createAsyncThunk(
  "getItems",
  async ({filter, type, sortPrice}) => {
    const response = await getItemsData({filter: filter, type: type, sortPrice: sortPrice});
    return {
      response: response
    }
  }
)