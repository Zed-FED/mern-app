import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegistrationReducer,
  getUsersReducers,
  getSingleUserReducer,
  editUserReducer,
  deleteUserReducer,
  addUserReducer,
} from "./redux/reducers/userReducers";
import {
  addCategoryReducer,
  deleteCategoryReducer,
  editCategoryReducer,
  getCategoriesReducer,
  getSingleCategoryReducer,
} from "./redux/reducers/categoryReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegistrationReducer,
  getUsers: getUsersReducers,
  getSingleUser: getSingleUserReducer,
  editUser: editUserReducer,
  deleteUser: deleteUserReducer,
  addUser: addUserReducer,
  getCategories: getCategoriesReducer,
  getSingleCategory: getSingleCategoryReducer,
  editCategory: editCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  addCategory: addCategoryReducer,
});

const userInfoFromStorage = localStorage.getItem("User Info")
  ? JSON.parse(localStorage.getItem("User Info"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  // initialUsers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
