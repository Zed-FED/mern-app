import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_SINGLE_CATEGORY,
  GET_SINGLE_CATEGORY_SUCCESS,
  GET_SINGLE_CATEGORY_FAIL,
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  EDIT_CATEGORY,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAIL,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from "../constants/categoryConstants";
import axios from "axios";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES });

    axios
      .get("/categories")
      .then((response) => {
        const result = response.data;
        const { status, message } = result;

        if (status !== "SUCCESS") {
          console.log(status, message);
          console.log("Not Success");
        } else {
          dispatch({ type: GET_CATEGORIES_SUCCESS, payload: result.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAIL,
      payload: error,
    });
  }
};

export const getSingleCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_CATEGORY });

    axios
      .get(`/CATEGORIES/${id}`)
      .then((response) => {
        const result = response.data;
        // console.log(response);
        const { status } = result;
        if (status !== "SUCCESS") {
          // console.log(status, message);
          // console.log("Not Success")
        } else {
          dispatch({ type: GET_SINGLE_CATEGORY_SUCCESS, payload: result.data });
          // console.log("Success")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CATEGORY_FAIL,
      payload: error,
    });
  }
};

export const editCategory = (id, name) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_CATEGORY });
    await axios
      .put(`/categories/${id}`, name)
      .then((response) => {
        const result = response.data;
        console.log(result);
        // console.log(response);
        const { status } = result;
        if (status !== "SUCCESS") {
          // console.log(status, message);
          // console.log("Not Success")
        } else {
          dispatch({ type: EDIT_CATEGORY_SUCCESS, payload: result.data });
          // console.log("Success")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch({
      type: EDIT_CATEGORY_FAIL,
      payload: error,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY });

    await axios
      .delete(`/categories/${id}`)
      .then((response) => {
        const result = response.data;
        console.log(result);
        const { status } = result;
        if (status !== "SUCCESS") {
          // console.log("Not Success")
        } else {
          dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: result.data });
          console.log("Success");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error,
    });
  }
};

export const addCategory = (name) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CATEGORY });

    const url = "/categories";
    const credentials = {
      name: name,
    };

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          console.log("Success");
          dispatch({ type: ADD_CATEGORY_SUCCESS, payload: result.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch({ type: ADD_CATEGORY_FAIL, payload: error });
  }
};
