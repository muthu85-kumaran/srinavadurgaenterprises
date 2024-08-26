import { getProductImages } from "@/actions/products/productAction";
import Image from "next/image";
import React, { Suspense } from "react";
import { CircleCheck } from "lucide-react";
import SetDefaultImageButton from "./setDefaultImageButton";

import DeleteImageButton from "./deleteimagebutton";
import Loading from "@/app/admin/loading";

interface GetProductImagesProps {
  id: string;
}

const GetProductImages = async ({ id }: GetProductImagesProps) => {
  const res = await getProductImages(id);
  const products = res.data;

  return (
    <Suspense fallback={<Loading />}>
      <p className="text-lg font-semibold text-stone-700 p-5">
        Already Uploaded Images of
        <span className="text-stone-900 pl-3">{products[0].product.name}</span>
      </p>
      <div className="grid grid-cols-4  gap-3">
        {products.map((p, index) => (
          <div
            className="flex flex-col gap-3 justify-center items-center shadow-md border p-3 border-stone-400"
            key={index}
          >
            <Image src={p.imageUrl} width={300} height={300} alt="" />
            {p.isMain ? (
              <div className="flex justify-center items-center gap-3">
                <CircleCheck size={64} className="text-green-600 py-3" />
                <DeleteImageButton id={p.id} />
              </div>
            ) : (
              <div className="flex justify-center items-center gap-3">
                <SetDefaultImageButton id={p.id}></SetDefaultImageButton>
                <DeleteImageButton id={p.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </Suspense>
  );
};

export default GetProductImages;
