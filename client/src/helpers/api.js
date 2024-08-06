import axiosInstance from "@/helpers/axios";

export const signup = async (userData) => {
  const formData = new FormData();
  if (userData.username) {
    formData.append("username", userData.username);
  }
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("confirmPassword", userData.confirmPassword);

  const response = await axiosInstance.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const login = async (userData) => {
  const formData = new FormData();
  formData.append("email", userData.email);
  formData.append("password", userData.password);

  const response = await axiosInstance.post("/users/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const loadUser = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/users/logout");
  return response.data;
};

export const updateUser = async (userData) => {
  const response = await axiosInstance.put("/users", userData);
  return response.data;
};

export const refreshToken = async (token) => {
  const response = await axiosInstance.post("/users/refresh-token", {
    token,
  });
  return response.data;
};
