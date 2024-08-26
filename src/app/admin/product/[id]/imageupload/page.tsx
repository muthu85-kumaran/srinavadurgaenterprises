import React, { Suspense } from "react";
import FileUpload from "@/components/fileupload-dropzone";
import GetProductImages from "./getproductimages";
import Loading from "@/app/admin/loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface ImageUploadProps {
  params: { id: string };
}

const ImageUpload = ({ params }: ImageUploadProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="mt-5">
        <Button variant={"outline"} className="mb-2" asChild>
          <Link href={`/admin/product`}>Back</Link>
        </Button>

        <h2 className="text-lg ">Upload Product Images</h2>

        <FileUpload productId={params.id} />
        <GetProductImages id={params.id} />
      </div>
    </Suspense>
  );
};

export default ImageUpload;
