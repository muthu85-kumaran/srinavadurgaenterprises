import React from "react";
import PowerKwForm from "../_components/PowerKwForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

const AddPowerKw = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        <PowerKwForm />
      </div>
    </>
  );
};

export default AddPowerKw;
