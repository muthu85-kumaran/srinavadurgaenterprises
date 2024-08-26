import { getDeliveryAction } from "@/actions/masters/deliveryAction";
import EditDelivery from "@/app/admin/masters/delivery/_components/EditDelivery";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Suspense } from "react";
import Loading from "@/app/admin/_components/loading";

import toast from "react-hot-toast";

const EditDeliveryPage = async ({ params }: { params: Params }) => {
  const response = await getDeliveryAction(params.id as string);
  if (!response.success) {
    toast.error(response.error as string);
  }
  return (
    <Suspense fallback={<Loading />}>
      <EditDelivery data={response.data} />
    </Suspense>
  );
};

export default EditDeliveryPage;
