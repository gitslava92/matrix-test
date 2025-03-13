import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAssets } from "../api";
import { Asset } from "../api";

export const fetchAssets = createAsyncThunk<
  Asset[],
  void,
  { rejectValue: string }
>("assets/fetchAssets", async (_, thunkAPI) => {
  try {
    const data = await getAssets();
    if (data) return data;
    return thunkAPI.rejectWithValue("No data received");
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("Error on loading assets list");
  }
});
