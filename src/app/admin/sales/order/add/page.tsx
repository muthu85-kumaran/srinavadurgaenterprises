import React, { Suspense } from "react";
import SalesOrderForm from "../_components/SalesOrderForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

import Loading from "@/app/admin/_components/loading";
import { listProductAction } from "@/actions/products/productAction";
import { Customer, PaymentMode, Product } from "@prisma/client";
import { listCustomerAction } from "@/actions/users/CustomerAction";
import { listPaymentModeAction } from "@/actions/masters/PaymentModeAction";
import { getAllStatesOfIndia } from "@/actions/countryAction";

const AddSalesOrder = async () => {
  const products = await listProductAction();
  const PaymentModes = await listPaymentModeAction();
  const customers = await listCustomerAction();
  const states = await getAllStatesOfIndia();
  // const salesOrderStatuses = await listSalesOrderStatusAction();

  return (
    <>
      <Breadcrumbs />
      <div className="w-full p-4">
        <Suspense fallback={<Loading />}>
          <SalesOrderForm
            products={products?.data as any[]}
            PaymentModes={PaymentModes.data as PaymentMode[]}
            Customers={customers.data as Customer[]}
            states={states}
          />
        </Suspense>
      </div>
    </>
  );
};

export default AddSalesOrder;
