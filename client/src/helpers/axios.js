import { env } from "@/helpers/env";
import axios from "axios";
import { refreshToken } from "./api";

const axiosInstance = axios.create({
  baseURL: env.API_URL,
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const token = JSON.parse(localStorage.getItem("user")).refreshToken;

      try {
        // Attempt to refresh the token
        const { data } = await refreshToken(token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Set the new token in the headers
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.user.accessToken}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("user");
        return Promise.reject("refreshError");
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
