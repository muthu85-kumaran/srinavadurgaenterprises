"use client";
import ProductTaxForm from "./ProductTaxForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import { ProductTax } from "@/types/ProductTax";

const EditProductTax = ({ data }: { data: ProductTax | unknown }) => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        {typeof data !== "undefined" && (
          <ProductTaxForm ProductTax={data as ProductTax} />
        )}
      </div>
    </>
  );
};

export default EditProductTax;
