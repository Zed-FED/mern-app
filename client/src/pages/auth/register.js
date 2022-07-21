import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import Loader from "../../components/loader/loader";
import { userRegistration } from "../../redux/actions/userActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import Card from "../../components/common/Card/Card";
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
const Register = ({ departments }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    showPassword: false,
  });

  // const [isError, setIsError] = useState("");

  const [checkIsAdmin, setCheckIsAdmin] = useState(false);
  // console.log(checkIsAdmin);
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  let { loading, error, userInfo } = userRegister;

  let navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const onSubmitFormHandler = async (e) => {
    e.preventDefault();

    dispatch(
      userRegistration(
        user.name,
        user.email,
        user.department,
        user.password,
        checkIsAdmin
      )
    );
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/home/");
    }
    dispatch(getCategories());
  }, [dispatch, navigate, userInfo]);
  return (
    <>
      {loading && <Loader />}
      <Card className="auth-form-container">
        <Typography variant="h4" component="h4" color="primary">
          Register
        </Typography>
        {error && (
          <Alert severity="error" className="d-flex align-items-center my-10px">
            {error}
          </Alert>
        )}
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkIsAdmin}
                  onChange={() => setCheckIsAdmin(!checkIsAdmin)}
                />
              }
              label="Is Admin?"
            />
          </div>
          <Button variant="contained" type="submit" sx={{ m: 1 }}>
            Register
          </Button>
        </form>
        <div className="mt-10px">
          <Link to="/">Back to Login</Link>
        </div>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    departments: state.getCategories,
  };
};

export default connect(mapStateToProps)(Register);
