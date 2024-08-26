import { Suspense } from "react";
import Loading from "@/app/admin/_components/loading";
import db from "@/db/database";
import Link from "next/link";
import Breadcrumbs from "../../../_components/Breadcrumbs";
import VendorForm from "../_components/VendorForm";

const EditVendorPage = async ({ params }: { params: { id: string } }) => {
  try {
    const Vendor = await db.vendor.findUnique({
      where: { id: params.id },
      include: { vendorBankDetail: true },
    });
    if (!Vendor) {
      return (
        <>
          <Breadcrumbs />
          <Suspense fallback={<Loading />}>
            <div className="flex flex-col">
              <p>Vendor not found</p>
              <Link href="/admin/vendor">Back</Link>
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
            <VendorForm Vendor={Vendor as any} />
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
            <p>Vendor not found</p>
            {error instanceof Error && <p>{error.name}</p>}
            <Link href="/admin/vendor">Back</Link>
          </div>
        </Suspense>
      </>
    );
  }
};

export default EditVendorPage;
