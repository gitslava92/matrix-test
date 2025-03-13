import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AssetState, SelectedAsset } from "./types";
import { Asset } from "../api";
import { fetchAssets } from "./thunk";

const preloadedState = JSON.parse(localStorage.getItem("reduxState") || "{}");

const initialState: AssetState = {
  assets: [],
  selectedAssets: preloadedState?.selectedAssets || [],
  portfolioTotal: preloadedState?.portfolioTotal || 0,
  loading: false,
  error: null,
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    setAssets: (state, action: PayloadAction<Asset[]>) => {
      state.assets = action.payload;
    },
    setSellectedAsset: (state, action: PayloadAction<SelectedAsset>) => {
      state.portfolioTotal += action.payload.sum;
      state.selectedAssets = [
        ...state.selectedAssets.map((asset) => ({
          ...asset,
          share: (asset.sum / state.portfolioTotal) * 100,
        })),
        {
          ...action.payload,
          share: (action.payload.sum / state.portfolioTotal) * 100,
        },
      ];
    },
    removeSelectedAsset: (state, action: PayloadAction<SelectedAsset>) => {
      state.portfolioTotal -= action.payload.sum;
      state.selectedAssets = state.selectedAssets.reduce<SelectedAsset[]>(
        (acc, asset) => {
          if (asset.id !== action.payload.id) {
            acc.push({
              ...asset,
              share: (asset.sum / state.portfolioTotal) * 100,
            });
          }
          return acc;
        },
        []
      );
    },
    updateAssetFromWebSocket: (
      state,
      action: PayloadAction<{ portfolioTotal: number; assets: SelectedAsset[] }>
    ) => {
      state.selectedAssets = action.payload.assets.map((asset) => ({
        ...asset,
        share: (asset.sum / action.payload.portfolioTotal) * 100,
      }));
      state.portfolioTotal = action.payload.portfolioTotal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.assets = action.payload;
        state.loading = false;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch assets";
      });
  },
});

export const {
  setAssets,
  setSellectedAsset,
  removeSelectedAsset,
  updateAssetFromWebSocket,
} = assetsSlice.actions;
export const assetsReducer = assetsSlice.reducer;
