import { Asset } from "../api";

export interface SelectedAsset {
  id: string;
  name: string;
  count: number;
  price: number;
  sum: number;
  change: number;
  share: number;
}

export interface AssetState {
  assets: Asset[];
  selectedAssets: SelectedAsset[];
  portfolioTotal: number;
  loading: boolean;
  error: string | null;
}
