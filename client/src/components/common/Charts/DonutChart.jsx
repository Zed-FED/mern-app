import ReactApexChart from "react-apexcharts";

const dataInitialState = {
  series: [44, 55, 41, 17, 15],
  options: {
    chart: {
      type: "donut",
    },
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};

const DonutChart = () => {
  return (
    <div id="donutChart">
      <ReactApexChart
        options={dataInitialState.options}
        series={dataInitialState.series}
        type="donut"
      />
    </div>
  );
};

export default DonutChart;
