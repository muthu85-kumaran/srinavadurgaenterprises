import React, { Suspense } from "react";
import SalesInvoiceForm from "../_components/SalesInvoiceForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

import Loading from "@/app/admin/_components/loading";
import { listProductAction } from "@/actions/products/productAction";
import { Customer, PaymentMode } from "@prisma/client";
import { listCustomerAction } from "@/actions/users/CustomerAction";
import { listPaymentModeAction } from "@/actions/masters/PaymentModeAction";
import { getAllStatesOfIndia } from "@/actions/countryAction";
import { SalesOrder } from "@/actions/sales/SalesOrderAction";
import { listSalesOrderPendingAction } from "@/actions/sales/SalesOrderAction";
const salesAddPage = async () => {
  const products = await listProductAction();
  const PaymentModes = await listPaymentModeAction();
  const customers = await listCustomerAction();
  const states = await getAllStatesOfIndia();
  const orders = await listSalesOrderPendingAction();
  return (
    <>
      <Breadcrumbs />
      <div className="w-full p-4">
        <Suspense fallback={<Loading />}>
          <SalesInvoiceForm
            products={products?.data as any[]}
            PaymentModes={PaymentModes.data as PaymentMode[]}
            Customers={customers.data as Customer[]}
            orders={orders.data as SalesOrder[]}
            states={states}
          />
        </Suspense>
      </div>
    </>
  );
};

export default salesAddPage;
