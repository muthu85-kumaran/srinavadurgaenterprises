import React from "react";
import PumpInsTypeForm from "../_components/PumpTypeInsForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

const AddPumpTypeIns = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        <PumpInsTypeForm />
      </div>
    </>
  );
};

export default AddPumpTypeIns;
