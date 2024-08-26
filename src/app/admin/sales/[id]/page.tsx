import React, { Suspense } from "react";
import ViewInvoice from "../_components/ViewInvoice";
import {
  SalesInvoice,
  getSalesInvoiceByIdAction,
} from "@/actions/sales/SalesInvoiceAction";
import Loading from "../../loading";

interface SalesViewPageProps {
  params: {
    id: string;
  };
}
const SalesEditPage = async ({ params }: SalesViewPageProps) => {
  const result = await getSalesInvoiceByIdAction(params.id);

  if (!result.success) {
    return <div>Invoice not found</div>;
  }
  const data = result.data;
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ViewInvoice sales={data as SalesInvoice} />
      </Suspense>
    </div>
  );
};

export default SalesEditPage;
