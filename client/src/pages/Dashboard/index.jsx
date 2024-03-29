import Card from "../../components/common/Card/Card";
import ColumnChart from "../../components/common/Charts/ColumnChart";
import DonutChart from "../../components/common/Charts/DonutChart";
// import AppDatePicker from '../../components/DatePicker/DatePicker'
import EventList from "../../components/common/EventList/EventList";
import PeopleIcon from "@mui/icons-material/People";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import EmployeeList from "../Employee/EmployeeList";
// From Home
import { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../../redux/actions/userActions";
import { Typography } from "@mui/material";

const Dashboard = ({ userList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { users } = userList;

  const adminUsers =
    users &&
    users.filter((user) => {
      return user.isAdmin === true;
    });
  const filteredUser =
    users &&
    users.filter((user) => {
      return user.isAdmin !== true;
    });

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate(`/${userInfo._id}`);
    }
    dispatch(getUsers());
  }, [dispatch, navigate, userInfo.isAdmin, userInfo._id]);

  const sortArr = users && filteredUser.reverse().slice(0, 3);

  return (
    <>
      <Typography
        variant="h5"
        component="h1"
        color="primary.main"
        sx={{ flexGrow: 1, fontWeight: 600, mb: 2 }}
      >
        Dashboard
      </Typography>

      {/* Top Cards */}
      <div className="card-row grid-3 d-grid gap-50px">
        <Card className="p-15px d-flex align-items-center">
          <div className="flex-grow-1">
            {/*<h3 className="mt-0">Total Employee</h3>*/}
            <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
              Total Employee
            </Typography>
            <h2>{users && filteredUser.length}</h2>
          </div>
          <PeopleIcon sx={{ fontSize: 60 }} color="primary" />
        </Card>
        <Card className="p-15px d-flex align-items-center">
          <div className="flex-grow-1">
            {/*<h3 className="mt-0">On Leave</h3>*/}
            <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
              On Leave
            </Typography>
            <h2>03</h2>
          </div>
          <TimeToLeaveIcon sx={{ fontSize: 60 }} color="primary" />
        </Card>
        <Card className="p-15px d-flex align-items-center">
          <div className="flex-grow-1">
            {/*<h3 className="mt-0">Admins</h3>*/}
            <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
              Admins
            </Typography>
            <h2>{users && adminUsers.length}</h2>
          </div>
          <AdminPanelSettingsIcon sx={{ fontSize: 60 }} color="primary" />
        </Card>
      </div>

      {/* Charts */}
      <div className="chart-row my-30px d-grid grid-4 gap-30px">
        <Card className="col-span-2">
          {/*<h2 className="m-0 p-15px seperator">Some Heading</h2> */}
          <Typography
            variant="h6"
            component="h3"
            className="seperator"
            sx={{ fontWeight: 500, p: 2 }}
          >
            Some Heading
          </Typography>
          <div className="px-15px">
            <ColumnChart />
          </div>
        </Card>

        <Card>
          {/*<h2 className="m-0 p-15px seperator">Users by Department</h2> */}
          <Typography
            variant="h6"
            component="h3"
            className="seperator"
            sx={{ fontWeight: 500, p: 2 }}
          >
            Users by Department
          </Typography>
          <DonutChart />
        </Card>

        {/* <AppDatePicker /> */}
        <Card>
          {/*<h2 className="m-0 p-15px seperator">Recently Added</h2> */}
          <Typography
            variant="h6"
            component="h3"
            className="seperator"
            sx={{ fontWeight: 500, p: 2 }}
          >
            Recently Added
          </Typography>
          <EventList users={users} sortArr={sortArr} />
        </Card>
      </div>

      <div className="my-30px">
        <Card>
          <EmployeeList />
        </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.getUsers,
  };
};

export default connect(mapStateToProps)(Dashboard);
