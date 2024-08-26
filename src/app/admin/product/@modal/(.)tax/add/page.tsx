import React from "react";
import ProductTaxForm from "@/app/admin/product/tax/_components/ProductTaxForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import DialogModal from "@/components/DialogModal";
const AddProductTax = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        <DialogModal>
          <ProductTaxForm />
        </DialogModal>
      </div>
    </>
  );
};

export default AddProductTax;
