import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import Loader from "../../components/loader/loader";
import { userRegistration } from "../../redux/actions/userActions";
import { Link } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
  });

  const [checkIsAdmin, setCheckIsAdmin] = useState(false);
  // console.log(checkIsAdmin);
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
          <select
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
          </select>
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
      <Link to="/">Back to Login</Link>
    </>
  );
};

export default Register;
