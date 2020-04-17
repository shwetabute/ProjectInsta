import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register user
export const registerUser = (userData, history) => 
dispatch => {
  axios
      .post("/api/users/register", userData)
      .then(res => history.push('/login'))
      .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
        
  )
}

//Login  - get user token
export const loginUser = userData => dispatch =>{
  axios
      .post("/api/users/register", userData)
      .then(res => {
        const {token} = res.data;
        //save to localstorage
        localStorage.setItem('jwtToken', token);
        //set token to axios auth header
        setAuthToken(token);

        //Decode the token to get the user data
        const decode = jwt_decode(token);

        //Dispatch set current user
        dispatch({
          type: SET_CURRENT_USER,
          pyload: decode
        })
      })
      .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })

      )};