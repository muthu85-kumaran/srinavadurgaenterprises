import React, { Suspense } from "react";
import ReceiptForm from "../_components/ReceiptForm";
import { listCustomerAction } from "@/actions/users/CustomerAction";
import { listSalesInvoicePaymentPendingAction } from "@/actions/sales/SalesInvoiceAction";
import { listSalesOrderPaymentPendingAction } from "@/actions/sales/SalesOrderAction";
import {
  Customer,
  PaymentMode,
  SalesInvoice,
  SalesOrder,
} from "@prisma/client";

import Loading from "@/app/admin/_components/loading";
import { listPaymentModeWithoutCreditAction } from "@/actions/masters/PaymentModeAction";

const NewReceiptPage = async () => {
  const customers = await listCustomerAction();
  const salesInvoices = await listSalesInvoicePaymentPendingAction();
  const salesOrders = await listSalesOrderPaymentPendingAction();
  const paymentModes = await listPaymentModeWithoutCreditAction();

  return (
    <div className="w-full p-4">
      <Suspense fallback={<Loading />}></Suspense>
      <ReceiptForm
        customers={customers.data as Customer[]}
        salesInvoices={salesInvoices.data as SalesInvoice[]}
        salesOrders={salesOrders.data as SalesOrder[]}
        paymentModes={paymentModes.data as PaymentMode[]}
      />
    </div>
  );
};

export default NewReceiptPage;
