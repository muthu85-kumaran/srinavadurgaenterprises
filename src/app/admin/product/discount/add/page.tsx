import React from "react";
import ProductDiscountForm from "../_components/ProductDiscountForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

const AddProductDiscount = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        <ProductDiscountForm />
      </div>
    </>
  );
};

export default AddProductDiscount;
