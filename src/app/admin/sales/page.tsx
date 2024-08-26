import React, { Suspense } from "react";

import Link from "next/link";
import { PlusSquareIcon } from "lucide-react";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import { listSalesInvoiceAction } from "@/actions/sales/SalesInvoiceAction";
import Loading from "@/app/admin/_components/loading";
import ListDataTable from "@/components/listdatatable";
import { columns } from "./_components/columns";
import { SalesInvoice } from "@/actions/sales/SalesInvoiceAction";

const SalesPage = async () => {
  const response = await listSalesInvoiceAction();

  return (
    <>
      <Breadcrumbs />
      <div className="flex justify-between bg-cyan-100 px-8 pt-4 pb-2 rounded-md shadow-md">
        <Link href="/admin/sales/add">
          <div className="flex items-center cursor-pointer">
            <PlusSquareIcon className="w-8 h-8 text-blue-500" />
            <span className="ml-2">Add Sales Invoice </span>
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <Suspense fallback={<Loading />}>
          <ListDataTable<SalesInvoice>
            tableData={response.data as SalesInvoice[]}
            columns={columns}
            filterColumn="invoiceNo"
          />
        </Suspense>
      </div>
    </>
  );
};

export default SalesPage;
