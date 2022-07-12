import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, logOut } from "../../redux/actions/userActions";
import Loader from "../loader/loader";

const Single = (props) => {
  // console.log(props)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSingle = useSelector((state) => {
    return state.getSingleUser;
  });

  const { loading, user } = getSingle;

  // console.log(user)

  const location = useLocation();

  const onLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  useEffect(() => {
    dispatch(getSingleUser(location.pathname));
  }, [dispatch, location.pathname]);

  return (
    <>
      <h1>Single</h1>
      {loading && <Loader />}
      {user && (
        <>
          <h2>{user.name}</h2> <h3>{user.email}</h3>{" "}
          <button onClick={onLogOut}>Log Out</button>
        </>
      )}
    </>
  );
};

export default Single;
