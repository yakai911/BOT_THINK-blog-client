import { LOAD_USER, LOAD_USER_PROFILE } from "./types";
import { isAuth } from "../actions/auth";
import { userPublicProfile } from "../actions/user";

export const loadUser = () => async (dispatch) => {
  const user = await isAuth();
  dispatch({
    type: LOAD_USER,
    payload: user,
  });
};

export const loadUserProfile = () => async (dispatch) => {
  const username = await isAuth().username;
  const userProfile = await userPublicProfile(username);
  dispatch({
    type: LOAD_USER_PROFILE,
    payload: { user: userProfile.user, blogs: userProfile.blogs },
  });
};
