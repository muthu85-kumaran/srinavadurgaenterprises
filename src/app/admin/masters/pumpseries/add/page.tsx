import React from "react";
import PumpSeriesForm from "../_components/pumpSeriesForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

const AddPumpSeries = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        <PumpSeriesForm />
      </div>
    </>
  );
};

export default AddPumpSeries;
