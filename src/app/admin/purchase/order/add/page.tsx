import { listCustomerAction } from "@/actions/users/CustomerAction";
import { listPaymentModeAction } from "@/actions/masters/PaymentModeAction";
import { getAllStatesOfIndia } from "@/actions/countryAction";
import { listProductAction } from "@/actions/products/productAction";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import Loading from "@/app/admin/loading";
import { PaymentMode, Vendor } from "@prisma/client";
import React, { Suspense } from "react";
import PurchaseOrderForm from "../_components/purchaseOrderForm";

const PurchaseOrderAddPage = async () => {
  const products = await listProductAction();
  const PaymentModes = await listPaymentModeAction();
  const vendors = await listCustomerAction();
  const states = await getAllStatesOfIndia();
  return (
    <>
      <Breadcrumbs />
      <div className="w-full p-4">
        <Suspense fallback={<Loading />}>
          <PurchaseOrderForm
            products={products?.data as any[]}
            PaymentModes={PaymentModes.data as PaymentMode[]}
            Vendors={vendors.data as Vendor[]}
            states={states}
          />
        </Suspense>
      </div>
    </>
  );
};

export default PurchaseOrderAddPage;
