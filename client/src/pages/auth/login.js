import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import axios from 'axios';
import Loader from "../../components/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  let navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const onSubmitFormHandler = async (e) => {
    e.preventDefault();

    dispatch(login(user.email, user.password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/home/", { replace: true });
    }
  }, [navigate, userInfo]);

  return (
    <div>
      {loading && <Loader />}
      <form onSubmit={onSubmitFormHandler}>
        <div>
          <input
            type="text"
            placeholder="Enter email"
            value={user.email}
            name="email"
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={user.password}
            name="password"
            onChange={inputChangeHandler}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      New user? <Link to="/register">Register here</Link>
    </div>
  );
};

export default Login;
