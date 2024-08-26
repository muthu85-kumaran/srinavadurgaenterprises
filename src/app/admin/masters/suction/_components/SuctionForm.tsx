"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import type { ZodIssue } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";
import { FaRegSquareCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { SaveSuctionAction } from "@/actions/masters/SuctionAction";
import { Suction, SuctionSchema } from "@/types/Suction";
import { getErrorMessage } from "@/lib/utils";

type SuctionFormProps = {
  Suction?: Suction;
};

const SuctionForm = ({ Suction }: SuctionFormProps) => {
  const [errors, setErrors] = React.useState<ZodIssue[]>([]);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const router = useRouter();
  const formData = useForm<z.infer<typeof SuctionSchema>>({
    resolver: zodResolver(SuctionSchema),
    defaultValues: {
      valueSuctionSize: Suction?.valueSuctionSize || 0,
      id: Suction?.id || undefined,
    },
  });
  const formAction = async (formData: FormData) => {
    const newSuction = {
      valueSuctionSize: formData.get("valueSuctionSize"),
      id: formData.get("id") || undefined,
    };
    //client side validation
    const validation = await SuctionSchema.safeParseAsync(newSuction);
    if (!validation.success && validation.error.errors.length > 0) {
      setErrors(validation.error.issues as ZodIssue[]);
      return;
    }
    //post data to server
    const result = await SaveSuctionAction(validation.data);
    // display server error if any
    if (!result.success) {
      if (result.error instanceof Array) {
        setErrors(result.error as ZodIssue[]);
      } else {
        toast.error(getErrorMessage(result.error));
      }
      return;
    }
    if (result.success) {
      setErrors([]);
      toast.success("Data saved successfully");
      router.push("/admin/masters/suction");
    }
  };

  return (
    <>
      <Form {...formData}>
        <form
          className="space-y-8 mb-4"
          action={async (formData: FormData) => {
            await formAction(formData);
          }}
        >
          <div className="grid grid-cols-1 gap-y-6">
            <FormField
              control={formData.control}
              name="valueSuctionSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Suction IN MM </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Suction Size In MM" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formData.control}
              name="id"
              render={({ field }) => (
                <FormItem hidden={true}>
                  <FormLabel> Id</FormLabel>
                  <FormControl>
                    <Input hidden={true} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className=""
              disabled={formData.formState.isSubmitting}
            >
              Save Changes
            </Button>

            <Button
              onClick={(e) => {
                e.preventDefault();
                formData.reset();
              }}
              className="ml-4"
              variant={"reset"}
              disabled={formData.formState.isSubmitting}
            >
              Reset
            </Button>
            <Button
              variant={"cancel"}
              type="button"
              className="ml-4 "
              disabled={formData.formState.isSubmitting}
              onClick={() => {
                formData.reset();
                setErrors([]);
                setSuccessMessage(null);
                router.push("/admin/suction");
              }}
            >
              Close
            </Button>
          </div>
        </form>
        {successMessage && (
          <Alert variant="success">
            <AlertTitle>
              <div className="flex gap-2">
                <FaRegSquareCheck />
                Success
              </div>
            </AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {errors.length > 0 && (
          <div className="relative">
            {errors.map((error: { message: any }, index: number) => (
              <Alert key={index} variant={"destructive"}>
                <AlertTitle>
                  <div className="flex gap-2">
                    <TriangleAlertIcon /> Error
                  </div>
                </AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}
      </Form>
    </>
  );
};

export default SuctionForm;
