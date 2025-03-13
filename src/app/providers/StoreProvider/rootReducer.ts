import { combineReducers } from "@reduxjs/toolkit";
import { assetsReducer } from "../../../entities/asset/model/slices";

export const rootReducer = combineReducers({
  assets: assetsReducer,
});
