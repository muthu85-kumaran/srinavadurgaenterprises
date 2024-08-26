import React from "react";
import ListPumpTypeIns from "./_components/ListPumpTypeIns";
import Link from "next/link";
import { PlusSquareIcon } from "lucide-react";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
const PumpTypeInsPage = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="flex justify-between bg-cyan-100 px-8 pt-4 pb-2 rounded-md shadow-md">
        <Link href="/admin/masters/pumptypeins/add">
          <div className="flex items-center cursor-pointer">
            <PlusSquareIcon className="w-8 h-8 text-blue-500" />
            <span className="ml-2">Add Pump Type (Installation)</span>
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <ListPumpTypeIns />
      </div>
    </>
  );
};

export default PumpTypeInsPage;
