import { getProductDiscountAction } from "@/actions/products/ProductDiscountAction";
import EditProductDiscount from "@/app/admin/product/discount/_components/EditProductDiscount";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Suspense } from "react";
import Loading from "@/app/admin/_components/loading";

import toast from "react-hot-toast";

const EditProductDiscountPage = async ({ params }: { params: Params }) => {
  const response = await getProductDiscountAction(params.id as string);
  if (!response.success) {
    toast.error(response.error as string);
  }
  return (
    <Suspense fallback={<Loading />}>
      <EditProductDiscount data={response.data} />
    </Suspense>
  );
};

export default EditProductDiscountPage;
