import React, { Suspense } from "react";
import Link from "next/link";
import { PlusSquareIcon } from "lucide-react";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import {
  listPurchaseOrderAction,
  PurchaseOrder,
} from "@/actions/purchase/purchaseOrderAction";
import toast from "react-hot-toast";
import Loading from "@/app/admin/_components/loading";
import ListDataTable from "@/components/listdatatable";
import { columns } from "./_components/columns";
const PurchaseOrderListPage = async () => {
  const response = await listPurchaseOrderAction();
  if (!response.success) {
    toast.error(response.error as string);
  }
  const purchaseOrder = response.data as PurchaseOrder[];

  return (
    <>
      <Breadcrumbs />
      <div className="flex justify-between bg-cyan-100 px-8 pt-4 pb-2 rounded-md shadow-md">
        <Link href="/admin/purchase/order/add">
          <div className="flex items-center cursor-pointer">
            <PlusSquareIcon className="w-8 h-8 text-blue-500" />
            <span className="ml-2">New Purchase Order </span>
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <Suspense fallback={<Loading />}>
          <ListDataTable<PurchaseOrder>
            tableData={purchaseOrder}
            columns={columns}
            filterColumn="orderNo"
          />
        </Suspense>
      </div>
    </>
  );
};

export default PurchaseOrderListPage;
