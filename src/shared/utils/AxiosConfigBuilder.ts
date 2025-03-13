import axios, { AxiosInstance } from "axios";

interface AxiosConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export const axiosConfigBuilder = (config: AxiosConfig = {}) => {
  const setBaseURL = (baseURL: string) => {
    return axiosConfigBuilder({ ...config, baseURL });
  };

  const setHeaders = (headers: Record<string, string>) => {
    return axiosConfigBuilder({
      ...config,
      headers: {
        ...config.headers,
        ...headers,
      },
    });
  };

  const build = (): AxiosInstance => axios.create(config);

  return {
    setBaseURL,
    setHeaders,
    build,
  };
};
