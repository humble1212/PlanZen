// src/redux/actions/authActions.js

import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../slices/authSlice";
import { account, ID } from "../../appwrite/config";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const session = await account.createEmailPasswordSession(email, password);
    if (session) {
      const user = await account.get();
      dispatch(loginSuccess(user));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const createAccount = (email, password, name) => async (dispatch) => {
  try {
    dispatch(loginStart());
    await account.create(ID.unique(), email, password, name);
    const session = await account.create(email, password);
    if (session) {
      const user = await account.get();
      dispatch(loginSuccess(user));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await account.deleteSessions();
    localStorage.removeItem("user");
    dispatch(logout());
  } catch (error) {
    console.log("Logout failed:", error);
  }
};
// delete user from all sessions
export const deleteUser = () => async (dispatch) => {
  try {
    await account.delete();
    localStorage.removeItem("user");
    dispatch(logout());
  } catch (error) {
    console.log("Delete user failed:", error);
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    const user = await account.get();
    dispatch(loginSuccess(user));
    if (user) {
      await account.get();
      dispatch(loginSuccess(JSON.parse(user)));
    } else {
      dispatch(logout());
    }
  } catch (error) {
    console.log("something went wrong:", error);
  }
};

export const verifySession = () => async (dispatch) => {
  try {
    await account.get();
    dispatch(loginSuccess(JSON.parse(localStorage.getItem("user"))));
  } catch (error) {
    dispatch(logout());
  }
};
