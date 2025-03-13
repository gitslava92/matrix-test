import { API_BASE_URL } from "../../../shared/constants";
import { axiosConfigBuilder } from "../../../shared/utils/AxiosConfigBuilder";
import { Asset } from "./types";

const axiosInstance = axiosConfigBuilder()
  .setBaseURL(API_BASE_URL)
  .setHeaders({ "Content-Type": "application/json" })
  .build();

const handleApiError = (error: unknown) => {
  console.error("API call failed", error);
  throw error;
};

export const getAssets = async () => {
  try {
    const response = await axiosInstance.get("/ticker/24hr");
    return response.data as Asset[];
  } catch (error) {
    handleApiError(error);
  }
};
