import axios from "axios";
import { setError, setToken, setUser, setUsers } from "./authSlice";
import store from "./store";

const api = axios.create({
  baseURL: "https://reqres.in/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    const { token } = response.data;

    store.dispatch(setToken(token));
    localStorage.setItem("token", token);

    return token;
  } catch (error) {
    store.dispatch(setError("Invalid credentials"));
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);

    store.dispatch(setUser(response.data));

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listUsers = async (page = 1) => {
  try {
    const response = await api.get(`/users?page=1`);

    store.dispatch(setUsers(response.data.data));

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (userId, updatedUserData) => {
  try {
    const response = await api.put(`/users/${userId}`, updatedUserData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
