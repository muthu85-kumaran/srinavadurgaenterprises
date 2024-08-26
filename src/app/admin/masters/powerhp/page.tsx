import React from "react";

import Link from "next/link";
import { PlusSquareIcon } from "lucide-react";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import ListPowerHp from "./_components/ListPowerHp";
const PowerHpPage = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="flex justify-between bg-cyan-100 px-8 pt-4 pb-2 rounded-md shadow-md">
        <Link href="/admin/masters/powerhp/add">
          <div className="flex items-center cursor-pointer">
            <PlusSquareIcon className="w-8 h-8 text-blue-500" />
            <span className="ml-2">Add Power (Hp)</span>
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <ListPowerHp />
      </div>
    </>
  );
};

export default PowerHpPage;
