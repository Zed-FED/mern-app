import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, connect, useSelector } from "react-redux";
import { addUser } from "../redux/actions/userActions";
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loader from "../components/loader/loader";
import AppDatePicker from "../components/common/DatePicker/DatePicker";

const AddUser = ({ departments }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    joiningDate: new Date(),
    showPassword: false,
  });
  // const [value, setValue] = useState(new Date());

  // console.log(user.joiningDate);
  const handleChange = (newValue) => {
    setUser({
      ...user,
      joiningDate: newValue,
    });
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const userAdd = useSelector((state) => state.addUser);

  let { loading, error, users } = userAdd;

  const onSubmitFormHandler = async (e) => {
    e.preventDefault();
    // console.log(user);
    dispatch(
      addUser(
        user.name,
        user.email,
        user.password,
        user.department,
        user.joiningDate
      )
    );
    // alert("User successfully added");
    setUser({
      ...user,
      name: "",
      email: "",
      password: "",
      department: "",
    });
    // if (users) {
    //   window.location.reload();
    //   // navigate("/home");
    //   console.log("User added");
    // }
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <h1>Add User</h1>
      {loading && <Loader />}
      {error && (
        <Alert severity="error" className="d-flex align-items-center my-10px">
          {error}
        </Alert>
      )}
      {users && <Alert severity="success">User Added</Alert>}
      <form onSubmit={onSubmitFormHandler}>
        <div>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="name">
              Enter name<sup>*</sup>
            </InputLabel>
            <Input
              id="name"
              name="name"
              type="text"
              value={user.name}
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
        <div>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="email">
              Enter Email<sup>*</sup>
            </InputLabel>
            <Input
              id="email"
              name="email"
              type="text"
              value={user.email}
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
        <div>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="password">
              Password<sup>*</sup>
            </InputLabel>
            <Input
              id="password"
              name="password"
              type={user.showPassword ? "text" : "password"}
              value={user.password}
              onChange={inputChangeHandler}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setUser({ ...user, showPassword: !user.showPassword })
                    }
                  >
                    {user.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 250 }}
            className="auth-select"
          >
            <InputLabel id="selectDepartmentLabel">Department</InputLabel>
            <Select
              labelId="selectDepartmentLabel"
              id="selectDepartment"
              value={user.department}
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
        <div className="mt-15px">
          <AppDatePicker
            name="joiningDate"
            value={user.joiningDate}
            handleChange={handleChange}
          />
        </div>
        <Button variant="contained" type="submit" sx={{ m: 1 }}>
          Add User
        </Button>
        {/* <button type="submit">Add User</button> */}
      </form>
      <Link to="/home">Back to Home</Link>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    departments: state.getCategories,
  };
};

export default connect(mapStateToProps)(AddUser);
