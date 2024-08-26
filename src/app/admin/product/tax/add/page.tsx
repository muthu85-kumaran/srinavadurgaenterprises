import React from "react";
import ProductTaxForm from "../_components/ProductTaxForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

const AddProductTax = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        <ProductTaxForm />
      </div>
    </>
  );
};

export default AddProductTax;
