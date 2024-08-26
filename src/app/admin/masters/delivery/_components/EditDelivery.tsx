"use client";
import DeliveryForm from "./DeliveryForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import { Delivery } from "@/types/Delivery";

const EditDelivery = ({ data }: { data: Delivery | unknown }) => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        {typeof data !== "undefined" && (
          <DeliveryForm Delivery={data as Delivery} />
        )}
      </div>
    </>
  );
};

export default EditDelivery;
