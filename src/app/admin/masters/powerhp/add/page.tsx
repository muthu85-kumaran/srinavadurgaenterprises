import React from "react";
import PowerHpForm from "../_components/PowerHpForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

const AddPowerHp = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        <PowerHpForm />
      </div>
    </>
  );
};

export default AddPowerHp;
