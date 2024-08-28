import axiosInstance from "@/helpers/axios";
import { CONSTANTS } from "@/helpers/constants";

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

export const fetchPosts = async (
  page = 0,
  limit = CONSTANTS.PAGINATION_LIMIT,
  sortBy = "createdAt",
  category,
  title
) => {
  const params = {
    page,
    limit,
    sortBy,
    ...(category && { category }),
    ...(title && { title }),
  };

  const response = await axiosInstance.get("/posts", {
    params,
  });
  return response.data;
};

export const fetchPostDetails = async (postId) => {
  const response = await axiosInstance.get(`/posts/${postId}`);

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

export const updatePost = async (id, postData) => {
  const response = await axiosInstance.put(`/posts/${id}`, postData);

  return response.data;
};

export const deletePost = async (id) => {
  const response = await axiosInstance.delete(`/posts/${id}`);

  return response.data;
};
export const likedPost = async (id) => {
  console.log("id", id);
  const response = await axiosInstance.post(`/posts/${id}/like`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
