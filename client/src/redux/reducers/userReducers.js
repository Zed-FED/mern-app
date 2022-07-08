import {
	USER_LOGIN_REQUEST, 
	USER_LOGIN_SUCCESS, 
	USER_LOGIN_FAIL, 
	USER_LOGOUT,
	USER_REGISTRATION_FAIL,
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_SUCCESS,
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,
    GET_SINGLE_USER,
    GET_SINGLE_USER_SUCCESS,
    GET_SINGLE_USER_FAIL,
    EDIT_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAIL,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
	switch(action.type) {
		case USER_LOGIN_REQUEST : 
		  return {loading: true};
		case USER_LOGIN_SUCCESS :
		  return {loading: false, userInfo: action.payload};
	    case USER_LOGIN_FAIL :
		  return {loading: false, error: action.payload}  ;
		case USER_LOGOUT :
		  return {};
		default : return state;       
	}
}


export const userRegistrationReducer = (state = {}, action) => {
	switch(action.type) {
		case USER_REGISTRATION_REQUEST : 
		  return {loading: true};
		case USER_REGISTRATION_SUCCESS :
		  return {loading: false, userInfo: action.payload};
	    case USER_REGISTRATION_FAIL :
		  return {loading: false, error: action.payload}  ;
		default : return state;       
	}
}

export const getUsersReducers = (state = {}, action) => {
	switch(action.type) {
		case GET_USERS :
		  return {loading: true};
		case GET_USERS_SUCCESS : 
		  return {loading: false, users: action.payload};
		case GET_USERS_FAIL :
		  return {loading: false, error: action.payload};
		default: return state;     
	}
}

export const getSingleUserReducer = (state = {}, action) => {
	switch(action.type) {
		case GET_SINGLE_USER :
		  return {...state, loading: true};
		case GET_SINGLE_USER_SUCCESS : 
		  return {...state, loading: false, user: action.payload};
		case GET_SINGLE_USER_FAIL :
		  return {...state, loading: false, error: action.payload};
		default: return state;     
	}
}

export const editUserReducer = (state = {}, action) => {
	switch(action.type) {
		case EDIT_USER :
		  return {...state, loading: true};
		case EDIT_USER_SUCCESS : 
		  return {...state, loading: false, user: action.payload};
		case EDIT_USER_FAIL :
		  return {...state, loading: false, error: action.payload};
		default: return state;     
	}
}

export const deleteUserReducer = (state = {}, action) => {
	switch(action.type) {
		case DELETE_USER :
		  return {loading: true};
		case DELETE_USER_SUCCESS : 
		  return {loading: false};
		case DELETE_USER_FAIL :
		  return {loading: false, error: action.payload};
		default: return state;     
	}
}

export const addUserReducer = (state = {}, action) => {
	switch(action.type) {
		case ADD_USER : 
		  return {loading: true};
		case ADD_USER_SUCCESS :
		  return {loading: false, users: action.payload};
	    case ADD_USER_FAIL :
		  return {loading: false, error: action.payload}  ;
		default : return state;       
	}
}