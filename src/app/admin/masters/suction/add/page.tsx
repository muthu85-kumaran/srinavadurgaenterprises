import React from "react";
import SuctionForm from "../_components/SuctionForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

const AddSuction = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        <SuctionForm />
      </div>
    </>
  );
};

export default AddSuction;
