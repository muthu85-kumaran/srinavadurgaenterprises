import React from "react";
import PaymentModeForm from "../_components/PaymentModeForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

const AddPaymentMode = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        <PaymentModeForm />
      </div>
    </>
  );
};

export default AddPaymentMode;
