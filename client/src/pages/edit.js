import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getSingleUser, editUser } from "../redux/actions/userActions";
import Loader from "../components/loader/loader";
// import { userUpdated } from './userSlice'
import axios from "axios";
import { getCategories } from "../redux/actions/categoryActions";
import {
  Alert,
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
import AppDatePicker from "../components/common/DatePicker/DatePicker";

const UpdateUser = ({ departments }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    department: "",
    joiningDate: "",
  });
  const [isError, setIsError] = useState();

  console.log(userData.joiningDate);

  const handleChange = (newValue) => {
    setUserData({
      ...userData,
      joiningDate: newValue,
    });
  };

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  /* Get Single User */
  const { loading, user } = useSelector((state) => {
    return state.getSingleUser;
  });

  const { error, updatedUser } = useSelector((state) => {
    return state.editUser;
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
        joiningDate: data.data.joiningDate,
      });
    };
    fetching();
  }, [dispatch, params.id]);

  const onSubmitFormHandler = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.email) {
      setIsError("Please fill require fields");
    }
    if (userData.name && userData.email) {
      dispatch(editUser(location.pathname, userData));
      // navigate("/home");
    }
  };

  // const newObj = Object.assign(userData, { name: user ? user.name : 'Some name', email: user ? user.email : 'Some email' })

  return (
    <>
      <h1>Update User</h1>
      {loading && <Loader />}
      {(isError || error) && (
        <Alert severity="error" className="d-flex align-items-center my-10px">
          {error ? error : isError}
        </Alert>
      )}

      {updatedUser && (
        <Alert severity="success" className="d-flex align-items-center my-10px">
          User updated successfully
        </Alert>
      )}

      {/* !isError && !error && <Alert severity="success">User Updated</Alert> */}

      {user && (
        <>
          <form onSubmit={onSubmitFormHandler}>
            <div style={{ padding: "0 0 10px" }}>
              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="name">
                  Name<sup>*</sup>
                </InputLabel>
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
                <InputLabel htmlFor="email">
                  Email<sup>*</sup>
                </InputLabel>
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
            <AppDatePicker
              name="joiningDate"
              value={userData.joiningDate}
              handleChange={handleChange}
            />
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
