"use client";
import ProductDiscountForm from "./ProductDiscountForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import { ProductDiscount } from "@/types/Discount";

const EditProductDiscount = ({ data }: { data: ProductDiscount | unknown }) => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        {typeof data !== "undefined" && (
          <ProductDiscountForm ProductDiscount={data as ProductDiscount} />
        )}
      </div>
    </>
  );
};

export default EditProductDiscount;
