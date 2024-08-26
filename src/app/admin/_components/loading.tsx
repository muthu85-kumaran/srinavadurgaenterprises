"use client";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200/90">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
  );
};

export default Loading;
