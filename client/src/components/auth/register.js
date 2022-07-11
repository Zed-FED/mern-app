import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import Loader from "../loader/loader";
import { userRegistration } from "../../redux/actions/userActions";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [checkIsAdmin, setCheckIsAdmin] = useState(false);
  console.log(checkIsAdmin);
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, userInfo } = userRegister;

  let navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const onSubmitFormHandler = async (e) => {
    e.preventDefault();
    dispatch(
      userRegistration(user.name, user.email, user.password, checkIsAdmin)
    );
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/home/");
    }
  }, [navigate, userInfo]);
  return (
    <>
      {loading && <Loader />}
      <form onSubmit={onSubmitFormHandler}>
        <div>
          <input
            type="text"
            placeholder="Enter name"
            value={user.name}
            name="name"
            onChange={inputChangeHandler}
            required
          />
        </div>
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
        <div>
          <label htmlFor="admin">is admin?</label>
          <input
            type="checkbox"
            required
            id="admin"
            checked={checkIsAdmin}
            onChange={() => setCheckIsAdmin(!checkIsAdmin)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
