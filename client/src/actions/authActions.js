import {
  SET_CURRENT_USER,
  GET_ERRORS,
  GET_PROFILES,
  GET_PROFILE,
  GET_POSTS,
  GET_POST,
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login  - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      //save to localstorage
      localStorage.setItem("jwtToken", token);
      //set token to axios auth header
      setAuthToken(token);

      //Decode the token to get the user data
      const decoded = jwt_decode(token);

      //Dispatch set current user
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded,
      });
    })

    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
        //payload: ((err||{}).response||{}).data || 'Error unexpected'
      })
    );
};

// Logout user
export const logoutUser = () => (dispatch) => {
  //Remove the token from localStorage
  localStorage.removeItem("jwtToken");

  //remove the token from authheader
  setAuthToken(false);

  //Cleanup the redux store
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
  dispatch({
    type: GET_PROFILES,
    payload: {},
  });
  dispatch({
    type: GET_PROFILE,
    payload: {},
  });
 
};
