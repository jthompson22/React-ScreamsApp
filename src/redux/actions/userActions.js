import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER, SET_UNAUTHENTICATED, MARK_NOTIFICATIONS_READ } from "../types";
import axios from 'axios';

//pass history to action
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});

    axios
      .post("/login", userData)
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData()); 
        dispatch({type: CLEAR_ERRORS});
        history.push('/');
      })
      .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
      });
}

export const logoutUser = () => (dispatch) =>{
  console.log("logging out")
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization']; //delete default in axios client
  dispatch({type: SET_UNAUTHENTICATED}); //clear our state of 
}

export const getUserData = () => (dispatch) => {
  //dispatch({type: LOADING_USER})
    dispatch({type: LOADING_USER});

    axios.get('/user')
        .then(res =>{
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch((err) => (console.log(err)));
}

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({type: LOADING_UI});
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData()); 
      dispatch({type: CLEAR_ERRORS});
      history.push('/');
    })
    .catch((err) => {
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })
    });
}


const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;//In this instance use Axios global and set the header
}

export const uploadImage = (formData) => (dispatch) => {
  dispatch({type: LOADING_USER});

  axios.post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER})
  axios.post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const markNotificationsRead = (notifications) => (dispatch) => {
  axios.post('/notifications', notifications)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      })
    })
    .catch(err => console.log(err));
}