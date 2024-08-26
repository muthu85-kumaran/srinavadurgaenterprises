import React, { Suspense } from "react";

import Link from "next/link";
import { PlusSquareIcon } from "lucide-react";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import ListProduct from "./_components/ListProduct";
import { listProductAction } from "@/actions/products/productAction";
import toast from "react-hot-toast";
import Loading from "@/app/admin/_components/loading";
const ProductPage = async () => {
  const response = await listProductAction();
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
        <Link href="/admin/product/add">
          <div className="flex items-center cursor-pointer">
            <PlusSquareIcon className="w-8 h-8 text-blue-500" />
            <span className="ml-2">Add Product </span>
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <Suspense fallback={<Loading />}>
          <ListProduct tableData={response.data} />
        </Suspense>
      </div>
    </>
  );
};

export default ProductPage;
