import React from "react";
import PumpAppTypeForm from "../_components/PumpTypeAppForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

const AddPumpTypeApp = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        <PumpAppTypeForm />
      </div>
    </>
  );
};

export default AddPumpTypeApp;
