import EditSuction from "@/app/admin/masters/suction/_components/EditSuction";
import Loading from "@/app/admin/_components/loading";
import toast from "react-hot-toast";
import { getSuctionAction } from "@/actions/masters/SuctionAction";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Suspense } from "react";

const EditSuctionPage = async ({ params }: { params: Params }) => {
  const response = await getSuctionAction(params.id as string);
  if (!response.success) {
    toast.error(response.error as string);
  }
  return (
    <Suspense fallback={<Loading />}>
      <EditSuction data={response.data} />
    </Suspense>
  );
};

export default EditSuctionPage;
