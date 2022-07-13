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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const Dashboard = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate(`/${userInfo._id}`);
    }
  }, [navigate, userInfo.isAdmin, userInfo._id]);

  return (
    <>
      <h1 className="mt-0">
        Welcome to your Dashboard{" "}
        <Box component="span" color="primary.main">
          {userInfo.name}
        </Box>
      </h1>

      {/* Top Cards */}
      <div className="card-row grid-3 d-grid gap-50px">
        <Card className="p-15px d-flex align-items-center">
          <div className="flex-grow-1">
            <h3 className="mt-0">Total Employee</h3>
            <h2>60</h2>
          </div>
          <PeopleIcon sx={{ fontSize: 60 }} color="primary" />
        </Card>
        <Card className="p-15px d-flex align-items-center">
          <div className="flex-grow-1">
            <h3 className="mt-0">On Leave</h3>
            <h2>03</h2>
          </div>
          <TimeToLeaveIcon sx={{ fontSize: 60 }} color="primary" />
        </Card>
        <Card className="p-15px d-flex align-items-center">
          <div className="flex-grow-1">
            <h3 className="mt-0">Admins</h3>
            <h2>05</h2>
          </div>
          <AdminPanelSettingsIcon sx={{ fontSize: 60 }} color="primary" />
        </Card>
      </div>

      {/* Charts */}
      <div className="my-30px d-grid grid-4 gap-30px">
        <Card className="col-span-2">
          <h2 className="m-0 p-15px seperator">Some Heading</h2>
          <div className="px-15px">
            <ColumnChart />
          </div>
        </Card>

        <Card>
          <h2 className="m-0 p-15px seperator">Some Heading</h2>
          <DonutChart />
        </Card>

        {/* <AppDatePicker /> */}
        <Card>
          <h2 className="m-0 p-15px seperator">Upcoming Events</h2>
          <EventList />
        </Card>
      </div>

      <div className="my-30px">
        <EmployeeList />
      </div>
    </>
  );
};

export default Dashboard;
