import { getProductTaxAction } from "@/actions/products/ProductTaxAction";
import EditProductTax from "@/app/admin/product/tax/_components/EditProductTax";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Suspense } from "react";
import Loading from "@/app/admin/_components/loading";

import toast from "react-hot-toast";

const EditProductTaxPage = async ({ params }: { params: Params }) => {
  const response = await getProductTaxAction(params.id as string);
  if (!response.success) {
    toast.error(response.error as string);
  }
  return (
    <Suspense fallback={<Loading />}>
      <EditProductTax data={response.data} />
    </Suspense>
  );
};

export default EditProductTaxPage;
