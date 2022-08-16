import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { connect, useDispatch } from "react-redux";
import { getUsers } from "../../../redux/actions/userActions";
import Loader from "../../loader/loader";
import axios from "axios";
// import { getCategories } from "../../../redux/actions/categoryActions";

const dataInitialState = {
  series: [44, 55, 41, 17, 15, 22],
  chartOptions: {
    chart: {
      type: "donut",
    },
    legend: {
      position: "bottom",
    },
    labels: [
      "series-1",
      "series-2",
      "series-3",
      "series-4",
      "series-5",
      "series-6",
    ],
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            // width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};

const DonutChart = ({ userList }) => {
  const [graphData, setGraphData] = useState(dataInitialState);
  let { loading } = userList;
  const dispatch = useDispatch();

  // const updatedSeries = [];
  // const arr = [];

  // const getUserByDepartment = (category) => {
  //   const filterUser =
  //     users &&
  //     users.filter((user) => {
  //       return user.department === category;
  //     });
  //   return filterUser;
  // };

  // categories &&
  //   categories.forEach((category) => {
  //     arr.push(getUserByDepartment(category.name));
  //   });

  // users &&
  //   categories &&
  //   arr.forEach((item) => {
  //     updatedSeries.push(item.length);
  //   });

  // console.log(updatedSeries);

  useEffect(() => {
    dispatch(getUsers());
    const fetching = async () => {
      const obj = await axios.get(`/categories`);
      const { data } = obj;
      const categoryName = data.data.map((category) => {
        return category.name;
      });

      const usersObj = await axios.get(`/users`);
      let usersArr = usersObj.data.data;

      const updatedSeries = [];
      const arr = [];

      const getUserByDepartment = (obj, category) => {
        const filterUser = obj.filter((user) => {
          return user.department === category;
        });
        return filterUser;
      };

      categoryName.forEach((category) => {
        arr.push(getUserByDepartment(usersArr, category));
      });
      arr.forEach((item) => {
        updatedSeries.push(item.length);
      });

      setGraphData((g) => {
        return {
          ...g,
          series: updatedSeries,
          chartOptions: {
            labels: categoryName,
          },
        };
      });
    };
    fetching();
  }, [dispatch]);
  return (
    <>
      {loading && <Loader />}
      <div id="donutChart">
        <ReactApexChart
          options={graphData.chartOptions}
          series={graphData.series}
          type="donut"
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.getUsers,
  };
};

export default connect(mapStateToProps)(DonutChart);
