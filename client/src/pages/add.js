import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { addUser } from "../redux/actions/userActions";
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AddUser = ({ departments }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    showPassword: false,
  });

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const onSubmitFormHandler = async (e) => {
    e.preventDefault();
    // console.log(user);
    dispatch(addUser(user.name, user.email, user.password, user.department));
    alert("User successfully added");
    window.location.reload();
    // navigate("/home");
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <h1>Add User</h1>
      <form onSubmit={onSubmitFormHandler}>
        <div>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="name">Enter name</InputLabel>
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
          {/* <input
            type="text"
            placeholder="Enter name"
            value={user.name}
            name="name"
            onChange={inputChangeHandler}
            required
              /> */}
        </div>
        <div>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="email">Enter Email</InputLabel>
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
          {/* <input
            type="text"
            placeholder="Enter email"
            value={user.email}
            name="email"
            onChange={inputChangeHandler}
            required
            /> */}
        </div>
        <div>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="password">Password</InputLabel>
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
          {/* <input
            type="password"
            placeholder="Enter password"
            value={user.password}
            name="password"
            onChange={inputChangeHandler}
            required
          /> */}
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
          {/* <select
            onChange={inputChangeHandler}
            value={user.department}
            name="department"
          >
            <option value="">Please Select Department</option>
            <option value="Frontend">FrontEnd</option>
            <option value="Backend">BackEnd</option>
            <option value="QA">QA</option>
            <option value="HR">HR</option>
            <option value="Management">Management</option>
        </select> */}
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
