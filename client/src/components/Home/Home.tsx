// import React from 'react'
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

function Home() {
  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          1.75, 1.875, 1.9375, 1.90625, 1.890625, 1.8828125, 1.87890625,
          1.876953125,
        ],
      },
      tooltip: {
        theme: "dark",
      },
    },
    series: [
      {
        name: "example",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
    <div className="w-full h-screen overflow-x">
      <div className="w-full h-full flex min-[340px]:flex-col lg:flex-row min-[340px]:mt-[200px] min-[340px]:min-[340px]:items-center lg:justify-around lg:items-center lg:px-[15rem] lg:m-0">
        {/* Left */}
        <div className="flex justify-center flex-col gap-5 lg:scale-105">
          <p className="text-2xl text-start">ระบบคำนวณเกี่ยวกับ</p>
          <h1 className="min-[340px]:text-2xl lg:text-5xl font-bold text-center flex gap-2">
            <span >Numerical</span>
            <span>Methods</span>
          </h1>
          <div className="flex gap-5 mt-3">
            <Link to="../lobby" className="px-[10px] py-[5px] bg-gray-700 rounded-lg hover:bg-secondary duration-500">
              Get Started
            </Link>
            <button className="px-[10px] py-[5px] bg-gray-700 rounded-lg hover:bg-secondary duration-500">
              Document
            </button>
          </div>
        </div>
        {/* endLeft  */}

        {/* Right */}
        <div className="Box-Numer-chart min-[340px]:mt-10 lg:m-0">
          <div className="row Numer-chart min-[340px]:w-[400px] lg:w-[700px]">
            <Chart
              options={state.options}
              series={state.series}
              type="line"
              width="100%"
            />
          </div>
        </div>
        {/* endRight */}
      </div>
    </div>
  );
}

export default Home;
