import React, { Suspense } from "react";
import CustomerForm from "../_components/CustomerForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";

import Loading from "@/app/admin/_components/loading";

const AddCustomer = async () => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-full p-4">
        <Suspense fallback={<Loading />}>
          <CustomerForm />
        </Suspense>
      </div>
    </>
  );
};

export default AddCustomer;
