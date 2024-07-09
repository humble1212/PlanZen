// src/redux/actions/userActions.js

import {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
} from "../slices/userSlice";
import { account } from "../../appwrite/config";

export const updateProfile = (userData) => async (dispatch) => {
  dispatch(updateProfileStart());
  try {
    const updatedUser = await account.updateName(userData.name);
    // Note: Appwrite doesn't have a built-in way to update bio, you might need to use a custom attribute or a separate database collection for this
    dispatch(updateProfileSuccess(updatedUser));
  } catch (error) {
    dispatch(updateProfileFailure(error.message));
  }
};
