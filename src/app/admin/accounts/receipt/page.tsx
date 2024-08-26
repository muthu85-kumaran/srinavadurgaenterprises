import { ListReceiptType, listReceipt } from "@/actions/accounts/ReceiptAction";

import ListDataTable from "@/components/listdatatable";
import { PlusSquareIcon } from "lucide-react";
import React, { Suspense } from "react";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import Loading from "@/app/admin/_components/loading";
import { columns } from "./_components/columns";
import Link from "next/link";
const ReceiptListPage = async () => {
  const response = await listReceipt();

  return (
    <>
      <Breadcrumbs />
      <div className="flex justify-between bg-cyan-100 px-8 pt-4 pb-2 rounded-md shadow-md">
        <Link href="/admin/accounts/receipt/add">
          <div className="flex items-center cursor-pointer">
            <PlusSquareIcon className="w-8 h-8 text-blue-500" />
            <span className="ml-2">New Receipt </span>
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <Suspense fallback={<Loading />}>
          <ListDataTable<ListReceiptType>
            tableData={response.data as ListReceiptType[]}
            columns={columns}
            filterColumn="referenceNo"
          />
        </Suspense>
      </div>
    </>
  );
};

export default ReceiptListPage;
