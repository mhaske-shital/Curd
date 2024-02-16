import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    error: null,
    user: null,
    users: [],
    formStatus: "add",
    editUser: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.token = null;
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setFormStatus: (state, action) => {
      state.formStatus = action.payload;
    },
    setEditUser: (state, action) => {
      console.log('action.pay', action.payload)
      state.editUser = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
      state.error = null;
      state.user = null;
      state.users = [];
      state.formStatus = "add";
      state.editUser = null;
    },
  },
});

export const {
  setToken,
  setError,
  setUser,
  setUsers,
  setFormStatus,
  setEditUser,
  clearAuth,
} = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectError = (state) => state.auth.error;
export const selectUser = (state) => state.auth.user;
export const selectUsers = (state) => state.auth.users;
export const selectFormStatus = (state) => state.auth.formStatus;
export const selectEditUser = (state) => state.auth.editUser;

export default authSlice.reducer;
