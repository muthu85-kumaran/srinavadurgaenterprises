import { Suspense } from "react";
import Loading from "@/app/admin/_components/loading";
import db from "@/db/database";
import Link from "next/link";
import Breadcrumbs from "../../../_components/Breadcrumbs";
import CustomerForm from "../_components/CustomerForm";

const EditCustomerPage = async ({ params }: { params: { id: string } }) => {
  try {
    const Customer = await db.customer.findUnique({
      where: { id: params.id },
    });
    if (!Customer) {
      return (
        <>
          <Breadcrumbs />
          <Suspense fallback={<Loading />}>
            <div className="flex flex-col">
              <p>Customer not found</p>
              <Link href="/admin/customer">Back</Link>
            </div>
          </Suspense>
        </>
      );
    }
    return (
      <>
        <Breadcrumbs />

        <div className="w-full p-4">
          <Suspense fallback={<Loading />}>
            <CustomerForm Customer={Customer} />
          </Suspense>
        </div>
      </>
    );
  } catch (error: unknown) {
    return (
      <>
        <Breadcrumbs />
        <Suspense fallback={<Loading />}>
          <div className="flex flex-col">
            <p>Customer not found</p>
            {error instanceof Error && <p>{error.name}</p>}
            <Link href="/admin/customer">Back</Link>
          </div>
        </Suspense>
      </>
    );
  }
};

export default EditCustomerPage;
