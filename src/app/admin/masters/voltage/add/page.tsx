import React from "react";
import VoltageForm from "../_components/VoltageForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

const AddVoltage = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        <VoltageForm />
      </div>
    </>
  );
};

export default AddVoltage;
