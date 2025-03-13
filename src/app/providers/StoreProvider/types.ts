import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface StoreProviderProps {
  children: React.ReactNode;
}
