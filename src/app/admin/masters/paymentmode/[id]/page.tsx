import { getPaymentModeAction } from "@/actions/masters/PaymentModeAction";
import EditPaymentMode from "@/app/admin/masters/paymentmode/_components/EditPaymentMode";

import { Suspense } from "react";
import Loading from "@/app/admin/_components/loading";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const EditPaymentModePage = async ({ params }: { params: Params }) => {
  const response = await getPaymentModeAction(params.id as string);
  console.log(params.id);
  return (
    <Suspense fallback={<Loading />}>
      <EditPaymentMode data={response.data} />
    </Suspense>
  );
};

export default EditPaymentModePage;
