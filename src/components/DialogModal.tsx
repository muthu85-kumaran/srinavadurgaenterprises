"use client";
import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogOverlay,
} from "./ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaWindowClose } from "react-icons/fa";

const DialogModal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent>
          {children}

          <DialogFooter>
            <Button
              variant={"destructive"}
              size={"icon"}
              onClick={handleOpenChange}
            >
              <FaWindowClose />
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default DialogModal;
