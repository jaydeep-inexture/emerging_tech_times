import axiosInstance from "@/helpers/axios";

//  ************ Auth **********************//
export const signup = async (userData) => {
  const response = await axiosInstance.post("/users/register", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const login = async (userData) => {
  const response = await axiosInstance.post("/users/login", userData, {
    headers: {
      "Content-Type": "application/json",
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

export const refreshToken = async (token) => {
  const response = await axiosInstance.post("/users/refresh-token", {
    token,
  });
  return response.data;
};

//  ************ Users **********************//

export const updateUser = async (userData) => {
  const response = await axiosInstance.put("/users", userData);
  return response.data;
};

export const grantAdminPermission = async (userId) => {
  const response = await axiosInstance.post(`/users/${userId}`);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

//  *************** Posts **************** //

export const fetchPosts = async () => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axiosInstance.post("/posts", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
