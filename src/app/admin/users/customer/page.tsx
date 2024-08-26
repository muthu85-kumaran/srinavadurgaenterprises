import React, { Suspense } from "react";

import Link from "next/link";
import { PlusSquareIcon } from "lucide-react";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import { listCustomerAction } from "@/actions/CustomerAction";
import toast from "react-hot-toast";
import Loading from "@/app/admin/_components/loading";
import { Customer } from "@/types/Customer";
import { columns } from "./_components/columns";
import ListDataTable from "@/components/listdatatable";

const CustomerPage = async () => {
  const response = await listCustomerAction();
  if (!response) {
    toast.error("Something went wrong");
  }
  if (!response.success) {
    toast.error(response.error as string);
  }

  return (
    <>
      <Breadcrumbs />
      <div className="flex justify-between bg-cyan-100 px-8 pt-4 pb-2 rounded-md shadow-md">
        <Link href="/admin/customer/add">
          <div className="flex items-center cursor-pointer">
            <PlusSquareIcon className="w-8 h-8 text-blue-500" />
            <span className="ml-2">Add Customer </span>
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <Suspense fallback={<Loading />}>
          <ListDataTable<Customer>
            tableData={response.data as Customer[]}
            columns={columns}
          />
        </Suspense>
      </div>
    </>
  );
};

export default CustomerPage;
