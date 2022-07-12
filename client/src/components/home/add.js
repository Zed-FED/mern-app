import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/userActions";
const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();

  const onSubmitFormHandler = async (e) => {
    e.preventDefault();
    dispatch(addUser(user.name, user.email, user.password));
    // navigate("/home");
    alert("User successfully added");
    window.location.reload();
  };

  return (
    <>
      <h1>Add User</h1>
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
        <button type="submit">Add User</button>
      </form>
      <Link to="/home">Back to Home</Link>
    </>
  );
};

export default AddUser;
