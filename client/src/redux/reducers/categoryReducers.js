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

export const getCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { loading: true };
    case GET_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload };
    case GET_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSingleCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_CATEGORY:
      return { ...state, loading: true };
    case GET_SINGLE_CATEGORY_SUCCESS:
      return { ...state, loading: false, category: action.payload };
    case GET_SINGLE_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_CATEGORY:
      return { ...state, loading: true };
    case EDIT_CATEGORY_SUCCESS:
      return { ...state, loading: false, category: action.payload };
    case EDIT_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY:
      return { loading: true };
    case DELETE_CATEGORY_SUCCESS:
      return { loading: false };
    case DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return { loading: true };
    case ADD_CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };
    case ADD_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
