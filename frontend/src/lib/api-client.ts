import Axios, { AxiosError, type AxiosRequestConfig } from "axios";

export const api = Axios.create({
  baseURL: process.env.VITE_API_URL,
});

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const promise = api({
    ...config,
    ...options,

  }).then(({ data }) => data as T);
  return promise;
};

api.interceptors.request.use((config) => {
  return { ...config, withCredentials: true };
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.error("Axios error:", error);

    if (error.response?.status === 401) {
      window.location.href = `${process.env.VITE_API_URL ?? ""}/api/auth/login`;
    }

    return Promise.reject(error);
  },
);
