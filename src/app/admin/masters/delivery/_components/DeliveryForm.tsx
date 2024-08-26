"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { SaveDeliveryAction } from "@/actions/masters/deliveryAction";
import { Delivery, DeliverySchema } from "@/types/Delivery";
import { getErrorMessage } from "@/lib/utils";
import result from "postcss/lib/result";

type DeliveryFormProps = {
  Delivery?: Delivery;
};

const DeliveryForm = ({ Delivery }: DeliveryFormProps) => {
  const [errorss, setErrors] = React.useState<ZodIssue[]>([]);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const router = useRouter();
  const zodform = useForm<z.infer<typeof DeliverySchema>>({
    resolver: zodResolver(DeliverySchema),
    defaultValues: {
      valueDeliverySize: Delivery?.valueDeliverySize || 0,
      id: Delivery?.id || undefined,
    },
    mode: "onBlur",
  });
  const { control, handleSubmit, reset, formState } = zodform;
  const { isSubmitting } = formState;
  const processForm: SubmitHandler<z.infer<typeof DeliverySchema>> = async (
    data
  ) => {
    const newdelivery = {
      valueDeliverySize: data.valueDeliverySize,
      id: data.id,
    };
    const result = await SaveDeliveryAction(newdelivery);
    if (!result) {
      toast.error("An error occurred while saving data");
      return;
    }
    if (result.error) {
      toast.error(getErrorMessage(result.error));
      return;
    }
    if (result.success) {
      toast.success("Data saved successfully");
      router.push("/admin/masters/delivery");
    }

    return result.data;
  };
  return (
    <>
      <Form {...zodform}>
        <form className="space-y-8 mb-4" onSubmit={handleSubmit(processForm)}>
          <div className="grid grid-cols-1 gap-y-6">
            <FormField
              control={control}
              name="valueDeliverySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Delivery IN MM </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Delivery Size In MM" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
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
            <Button type="submit" className="" disabled={isSubmitting}>
              Save Changes
            </Button>

            <Button
              onClick={(e) => {
                e.preventDefault();
                reset();
              }}
              className="ml-4"
              variant={"reset"}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              variant={"cancel"}
              type="button"
              className="ml-4 "
              disabled={isSubmitting}
              onClick={() => {
                reset();
                setErrors([]);
                setSuccessMessage(null);
                router.push("/admin/delivery");
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

        {errorss.length > 0 && (
          <div className="relative">
            {errorss.map((error: { message: any }, index: number) => (
              <Alert key={index} variant={"destructive"} className="mb-3">
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

export default DeliveryForm;
