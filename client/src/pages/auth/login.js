import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import axios from 'axios';
import Loader from "../../components/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import Card from "../../components/common/Card/Card";
import {
  Alert,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  let navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const onSubmitFormHandler = async (e) => {
    e.preventDefault();
    if (error) {
      setUser({
        ...user,
        email: "",
        password: "",
      });
    }
    dispatch(login(user.email, user.password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/home/", { replace: true });
    }
  }, [navigate, userInfo]);

  return (
    <>
      {loading && <Loader />}
      <Card className="auth-form-container">
        <Typography variant="h4" component="h4" color="primary">
          Login
        </Typography>
        {error && (
          <Alert severity="error" className="d-flex align-items-center my-10px">
            {error}
          </Alert>
        )}
        <form onSubmit={onSubmitFormHandler}>
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
          </div>
          <Button variant="contained" type="submit" sx={{ m: 1 }}>
            Login
          </Button>
        </form>
        <div className="mt-10px">
          New user? <Link to="/register">Register here</Link>
        </div>
      </Card>
    </>
  );
};

export default Login;
