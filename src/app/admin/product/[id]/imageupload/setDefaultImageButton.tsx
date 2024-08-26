"use client";
import { Button } from "@/components/ui/button";
import { SetDefaultImageAction } from "@/actions/products/productAction";
import React, { useTransition } from "react";
import { Loader } from "lucide-react";
interface SetDefaultImageButtonProps {
  id: string;
}

const SetDefaultImageButton = ({ id }: SetDefaultImageButtonProps) => {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      onClick={async () => {
        startTransition(async () => {
          await SetDefaultImageAction(id);
        });
      }}
      disabled={pending}
    >
      {pending && <Loader className="animate-spin pr-3" />} Set as Main Image
    </Button>
  );
};

export default SetDefaultImageButton;
