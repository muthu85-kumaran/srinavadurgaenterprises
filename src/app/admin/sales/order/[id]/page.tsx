import { Suspense } from "react";
import Loading from "@/app/admin/_components/loading";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import ViewSalesOrder from "../../_components/ViewSalesOrder";
import {
  SalesOrder,
  getSalesOrderAction,
} from "@/actions/sales/SalesOrderAction";

const SalesOrderViewPage = async ({ params }: { params: { id: string } }) => {
  const result = await getSalesOrderAction(params.id);
  if (!result.success) {
    return <div>Sales order not found</div>;
  }
  const data = result.data;

  return (
    <>
      <Breadcrumbs />
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col w-full px-3">
          <ViewSalesOrder sales={data as SalesOrder} />
        </div>
      </Suspense>
    </>
  );
};

export default SalesOrderViewPage;
