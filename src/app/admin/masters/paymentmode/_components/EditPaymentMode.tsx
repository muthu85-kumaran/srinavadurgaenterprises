"use client";
import PaymentModeForm from "./PaymentModeForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import { PaymentMode } from "@/types/PaymentMode";

const EditPaymentMode = ({ data }: { data: PaymentMode | unknown }) => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        {typeof data !== "undefined" && (
          <PaymentModeForm PaymentMode={data as PaymentMode} />
        )}
      </div>
    </>
  );
};

export default EditPaymentMode;
