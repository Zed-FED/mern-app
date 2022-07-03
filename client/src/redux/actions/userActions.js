import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAIL,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_SINGLE_USER,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL    
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const url = "http://localhost:8000/login";
        const credentials = { email: email, password: password };

          axios.post(url, credentials).then((response) => {
            const result = response.data;
            const { status, message } = result;
            if (status !== "LOGIN SUCCESS") {
              // alert(message, status);

            } else {
              // console.log(result.data);
              dispatch({type: USER_LOGIN_SUCCESS, payload: result.data})  
              localStorage.setItem('User Info', JSON.stringify(result.data))
              console.log("message", message);

            }
          }).catch((error) => {
            console.log(error);
          });
          
        // dispatch({type: USER_LOGIN_SUCCESS, payload: credentials})  

        // console.log(data)
        // localStorage.setItem("User Info", JSON.stringify(data))
        
      } catch(error) {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error
        })
      }
    
}


export const logOut = () => async(dispatch) => {
  localStorage.removeItem('User Info');
  dispatch({type: USER_LOGOUT})
}


export const userRegistration = (name, email, password) => async(dispatch) => {
  
  try {
    
    dispatch({type: USER_REGISTRATION_REQUEST})


    const url = "/users";
        const credentials = { name: name, email: email, password: password };

          axios
          .post(url, credentials)
          .then((response) => {
            const result = response.data;
            const { status, message } = result;
            if (status !== "SUCCESS") {
              alert(message, status);
            } else {

              dispatch({type: USER_REGISTRATION_SUCCESS, payload: result.data})  

              dispatch({type: USER_LOGIN_SUCCESS, payload: result.data})  

              localStorage.setItem('User Info', JSON.stringify(result.data))

            }
          })
          .catch((error) => {
            console.log(error);
          });

  } catch(error) {
    dispatch({type: USER_REGISTRATION_FAIL, payload: error})
  }
}

export const getUsers = () => async(dispatch) => {
  try {

    dispatch({ type: GET_USERS });

    axios.get("/users").then((response) => {
      const result = response.data;
      // console.log(result);
      const {status, message} = result;
      
      if(status !== "SUCCESS") {
        console.log(status, message);
      } else {
        dispatch({type: GET_USERS_SUCCESS, payload: result.data})
      }
    }).catch((error) => {
      console.log(error)
    })

  }catch(error) {
    dispatch({
      type: GET_USERS_FAIL,
      payload: error
    })
  }
}

export const getSingleUser = (id) => async(dispatch) => {
  try {

    dispatch({ type: GET_SINGLE_USER });

    await axios.get(`/users/${id}`).then((response) => {
      const result = response.data;
      // console.log(response);
      const {status} = result;
      if(status !== "SUCCESS") {
        // console.log(status, message);
        // console.log("Not Success")
      } else {
        dispatch({type: GET_SINGLE_USER_SUCCESS, payload: result.data})
        // console.log("Success")
      }
    }).catch((error) => {
      console.log(error)
    })

  }catch(error) {
    dispatch({
      type: GET_SINGLE_USER_FAIL,
      payload: error
    })
  }
}

export const editUser = (id, name, email) => async(dispatch) => {
  try {

    dispatch({ type: EDIT_USER });

    // const credentials = { name: name, email: email };

    await axios.put(`/users/${id}`, name, email).then((response) => {
      const result = response.data;
      console.log(result)
      // console.log(response);
      const {status} = result;
      if(status !== "SUCCESS") {
        // console.log(status, message);
        // console.log("Not Success")
      } else {
        dispatch({type: EDIT_USER_SUCCESS, payload: result.data})
        // console.log("Success")
      }
    }).catch((error) => {
      console.log(error)
    })

  }catch(error) {
    dispatch({
      type: EDIT_USER_FAIL,
      payload: error
    })
  }
}