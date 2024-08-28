import { env } from "@/helpers/env";
import axios from "axios";
import { refreshToken } from "./api";

const axiosInstance = axios.create({
  baseURL: env.API_URL,
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(sessionStorage.getItem("user"))?.accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        if (!storedUser || !storedUser.refreshToken) {
          throw new Error("No refresh token found");
        }

        const data = await refreshToken(storedUser.refreshToken);

        sessionStorage.setItem(
          "user",
          JSON.stringify({
            ...storedUser,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );

        // Set the new token in the headers
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        sessionStorage.removeItem("user");
        return Promise.reject("refreshError");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
