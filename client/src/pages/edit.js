import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getSingleUser, editUser } from "../redux/actions/userActions";
import Loader from "../components/loader/loader";
// import { userUpdated } from './userSlice'
import axios from "axios";
import { getCategories } from "../redux/actions/categoryActions";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

const UpdateUser = ({ departments }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    department: "",
  });
  // const [edit, setEdit] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  /* Get Single User */
  const { loading, user } = useSelector((state) => {
    return state.getSingleUser;
  });

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    dispatch(getSingleUser(params.id));
    dispatch(getCategories());
    // dispatch(fetchItems())
    const fetching = async () => {
      const { data } = await axios.get(`/users/${params.id}`);
      setUserData({
        name: data.data.name,
        email: data.data.email,
        department: data.data.department,
      });
    };
    fetching();
  }, [dispatch, params.id]);

  const onSubmitFormHandler = (e) => {
    e.preventDefault();
    if (user.name && user.email) {
      dispatch(editUser(location.pathname, userData));
      navigate("/home");
    }
  };

  // const newObj = Object.assign(userData, { name: user ? user.name : 'Some name', email: user ? user.email : 'Some email' })

  return (
    <>
      <h1>Update User</h1>
      {loading && <Loader />}
      {user && (
        <>
          <form onSubmit={onSubmitFormHandler}>
            <div style={{ padding: "0 0 10px" }}>
              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={userData.name}
                  onChange={inputChangeHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div style={{ padding: "0 0 10px" }}>
              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  value={userData.email}
                  onChange={inputChangeHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div style={{ padding: "0 0 10px" }}>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 250 }}
                className="auth-select"
              >
                <InputLabel id="selectDepartmentLabel">Department</InputLabel>
                <Select
                  labelId="selectDepartmentLabel"
                  id="selectDepartment"
                  value={userData.department}
                  label="Department"
                  onChange={inputChangeHandler}
                  name="department"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {departments.categories &&
                    departments.categories.map((category) => {
                      return (
                        <MenuItem key={category._id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </div>
            <Button variant="contained" type="submit" sx={{ m: 1 }}>
              Update
            </Button>
          </form>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    departments: state.getCategories,
  };
};

export default connect(mapStateToProps)(UpdateUser);
