import React from "react";
import ProductDiscountForm from "@/app/admin/product/discount/_components/ProductDiscountForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import DialogModal from "@/components/DialogModal";

const AddProductDiscount = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        <DialogModal>
          <ProductDiscountForm />
        </DialogModal>
      </div>
    </>
  );
};

export default AddProductDiscount;
