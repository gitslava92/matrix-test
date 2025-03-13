import { configureStore } from "@reduxjs/toolkit";
import { assetsReducer } from "../../../entities/asset/model";
import { Middleware } from "@reduxjs/toolkit";

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  const stateToPersist = {
    selectedAssets: store.getState().assets.selectedAssets,
    portfolioTotal: store.getState().assets.portfolioTotal,
  };

  localStorage.setItem("reduxState", JSON.stringify(stateToPersist));

  return result;
};

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  devTools: import.meta.env.MODE !== "production",
});
