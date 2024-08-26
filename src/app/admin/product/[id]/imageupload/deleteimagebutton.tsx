"use client";
import { DeleteImageAction } from "@/actions/products/productAction";
import { getErrorMessage } from "@/lib/utils";
import { Loader, Trash2Icon } from "lucide-react";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const DeleteImageButton = ({ id }: { id: string }) => {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant={"destructive"}
      size={"icon"}
      disabled={pending}
      onClick={async () => {
        startTransition(async () => {
          try {
            await DeleteImageAction(id);
          } catch (error) {
            toast.error(getErrorMessage(error));
          }
        });
      }}
    >
      {pending ? <Loader className="animate-spin pr-3" /> : <Trash2Icon />}
    </Button>
  );
};
export default DeleteImageButton;
