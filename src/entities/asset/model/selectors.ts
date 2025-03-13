import type { RootState } from "../../../app/providers";

export const allAssets = (state: RootState) => state.assets.assets;
export const selectedAssets = (state: RootState) => state.assets.selectedAssets;
export const portfolioTotal = (state: RootState) => state.assets.portfolioTotal;
