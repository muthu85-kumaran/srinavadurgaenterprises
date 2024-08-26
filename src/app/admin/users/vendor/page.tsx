import React, { Suspense } from "react";

import Link from "next/link";
import { PlusSquareIcon } from "lucide-react";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import ListVendor from "./_components/ListVendor";
import { listVendorAction } from "@/actions/users/VendorAction";
import toast from "react-hot-toast";
import Loading from "@/app/admin/_components/loading";
const VendorPage = async () => {
  const response = await listVendorAction();
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
        <Link href="/admin/vendor/add">
          <div className="flex items-center cursor-pointer">
            <PlusSquareIcon className="w-8 h-8 text-blue-500" />
            <span className="ml-2">Add Vendor </span>
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <Suspense fallback={<Loading />}>
          <ListVendor tableData={response.data} />
        </Suspense>
      </div>
    </>
  );
};

export default VendorPage;
