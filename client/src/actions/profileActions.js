import axios from "axios"
 
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then()
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload:err.response.data
    }))
 }
