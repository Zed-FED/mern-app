import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, getUsers, deleteUser } from "../../redux/actions/userActions";
import Loader from "../loader/loader";
import { useNavigate, Link } from "react-router-dom";

import { connect } from "react-redux";

import ListItem from "./listItem";
const Home = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, users } = props.users;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const onLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  useEffect(() => {
    dispatch(getUsers());
    if (!userInfo.isAdmin) {
      navigate(`/${userInfo._id}`);
    }
  }, [dispatch, navigate, userInfo.isAdmin, userInfo._id]);

  const tableStyle = {
    width: "100%",
    maxWidth: "600px",
    margin: "20px auto auto",
  };

  const viewUser = (id) => {
    navigate(`/${id}`);
  };

  const editUser = (id) => {
    navigate(`/edit/${id}`);
  };

  const deleteSingleUser = (id) => {
    // setModal(true)
    dispatch(deleteUser(id));
    window.location.reload();
  };

  // const filteredUser = async () => {
  //   const response =
  //     (await users) &&
  //     users.filter((user) => {
  //       return user.isAdmin !== true;
  //     });
  //   console.log(response);
  // };

  const filteredUser =
    users &&
    users.filter((user) => {
      return user.isAdmin !== true;
    });

  return (
    <>
      <h1>
        Welcome <span style={{ color: "blue" }}>{userInfo.name}</span>
      </h1>
      <button onClick={onLogOut}>Log Out</button>
      <Link to="/add">Add User</Link>
      {loading && <Loader />}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            filteredUser.map((user) => {
              const { _id, name, email } = user;
              return (
                <ListItem
                  key={_id}
                  _id={_id}
                  name={name}
                  email={email}
                  viewUser={viewUser}
                  editUser={editUser}
                  deleteSingleUser={deleteSingleUser}
                />
              );
            })}
        </tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.getUsers,
  };
};

export default connect(mapStateToProps)(Home);
