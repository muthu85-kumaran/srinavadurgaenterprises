import React from "react";
import ListPumpTypeApp from "./_components/ListPumpTypeApp";
import Link from "next/link";
import { PlusSquareIcon } from "lucide-react";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
const PumpTypeAppPage = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="flex justify-between bg-cyan-100 px-8 pt-4 pb-2 rounded-md shadow-md">
        <Link href="/admin/masters/pumptypeapp/add">
          <div className="flex items-center cursor-pointer">
            <PlusSquareIcon className="w-8 h-8 text-blue-500" />
            <span className="ml-2">Add Pump Type (Application)</span>
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <ListPumpTypeApp />
      </div>
    </>
  );
};

export default PumpTypeAppPage;
