import React, { Suspense } from "react";

import Link from "next/link";
import { PlusSquareIcon } from "lucide-react";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import { listPaymentModeAction } from "@/actions/masters/PaymentModeAction";
import toast from "react-hot-toast";
import Loading from "@/app/admin/_components/loading";
import ListDataTable from "@/components/listdatatable";
import { PaymentMode } from "@prisma/client";
import { columns } from "./_components/columns";
const PaymentModePage = async () => {
  const response = await listPaymentModeAction();
  if (!response.success) {
    toast.error(response.error as string);
  }

  return (
    <>
      <Breadcrumbs />
      <div className="flex justify-between bg-cyan-100 px-8 pt-4 pb-2 rounded-md shadow-md">
        <Link href="/admin/masters/paymentmode/add">
          <div className="flex items-center cursor-pointer">
            <PlusSquareIcon className="w-8 h-8 text-blue-500" />
            <span className="ml-2">Add Mode of Payment</span>
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <Suspense fallback={<Loading />}>
          <ListDataTable<PaymentMode>
            tableData={response.data as PaymentMode[]}
            columns={columns}
            filterColumn="name"
          />
        </Suspense>
      </div>
    </>
  );
};

export default PaymentModePage;
