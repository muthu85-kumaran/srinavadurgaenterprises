import React, { Suspense } from "react";

import Link from "next/link";
import { PlusSquareIcon } from "lucide-react";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import { listDeliveryAction } from "@/actions/masters/deliveryAction";
import toast from "react-hot-toast";
import Loading from "@/app/admin/_components/loading";
import ListDataTable from "@/components/listdatatable";
import { Delivery } from "@/types/Delivery";
import { columns } from "./_components/columns";
const DeliveryPage = async () => {
  const response = await listDeliveryAction();
  if (!response.success) {
    toast.error(response.error as string);
  }

  return (
    <>
      <Breadcrumbs />
      <div className="flex justify-between bg-cyan-100 px-8 pt-4 pb-2 rounded-md shadow-md">
        <Link href="/admin/masters/delivery/add">
          <div className="flex items-center cursor-pointer">
            <PlusSquareIcon className="w-8 h-8 text-blue-500" />
            <span className="ml-2">Add Delivery In MM</span>
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <Suspense fallback={<Loading />}>
          <ListDataTable<Delivery>
            tableData={response.data as Delivery[]}
            columns={columns}
            filterColumn="valueDeliverySize"
          />
        </Suspense>
      </div>
    </>
  );
};

export default DeliveryPage;
