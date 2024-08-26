import React from "react";
import DeliveryForm from "../_components/DeliveryForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

const AddDelivery = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        <DeliveryForm />
      </div>
    </>
  );
};

export default AddDelivery;
