import { Provider } from "react-redux";
import { store } from "./store";
import type { StoreProviderProps } from "./types";

export const StoreProvider = ({ children }: StoreProviderProps) => (
  <Provider store={store}>{children}</Provider>
);
