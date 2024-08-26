import React, { Suspense } from "react";

import Link from "next/link";
import { PlusSquareIcon } from "lucide-react";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import ListSuction from "./_components/ListSuction";
import { listSuctionAction } from "@/actions/masters/SuctionAction";
import toast from "react-hot-toast";
import Loading from "@/app/admin/loading";
const SuctionPage = async () => {
  const response = await listSuctionAction();
  if (!response.success) {
    toast.error(response.error as string);
  }
  return (
    <>
      <Breadcrumbs />
      <div className="flex justify-between bg-cyan-100 px-8 pt-4 pb-2 rounded-md shadow-md">
        <Link href="/admin/masters/suction/add">
          <div className="flex items-center cursor-pointer">
            <PlusSquareIcon className="w-8 h-8 text-blue-500" />
            <span className="ml-2">Add Suction In MM</span>
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <Suspense fallback={<Loading />}>
          <ListSuction tableData={response.data} />
        </Suspense>
      </div>
    </>
  );
};

export default SuctionPage;
