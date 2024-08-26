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
import { AddPowerKwAction } from "@/actions/masters/PowerInKwAction";
import { PowerKw, PowerKwSchema } from "@/types/powerKw";

type PowerKwFormProps = {
  PowerKw?: PowerKw;
};

const PowerKwForm = ({ PowerKw }: PowerKwFormProps) => {
  const [errors, setErrors] = React.useState<ZodIssue[]>([]);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const router = useRouter();
  const formData = useForm<z.infer<typeof PowerKwSchema>>({
    resolver: zodResolver(PowerKwSchema),
    defaultValues: {
      valueInKW: PowerKw?.valueInKW || 0,
      id: PowerKw?.id || undefined,
    },
  });
  const action = async (params: FormData) => {
    const results = await AddPowerKwAction(params);
    if ((results?.errors?.length ?? 0) > 0) {
      return { errors: results?.errors ? results.errors : [] };
    }
    formData.reset();

    return { errors: [] };
  };

  return (
    <>
      <Form {...formData}>
        <form
          className="space-y-8 mb-4"
          action={async (formData: FormData) => {
            const result = await action(formData);
            if (result.errors.length > 0) {
              setSuccessMessage(null);
              setErrors(result.errors as ZodIssue[]);
            } else {
              setErrors([]);
              toast.success("Data saved successfully");
              router.push("/admin/masters/powerkw");
            }
          }}
        >
          <div className="grid grid-cols-1 gap-y-6">
            <FormField
              control={formData.control}
              name="valueInKW"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Power In KW </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Power In KW" {...field} />
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
                router.push("/admin/powerkw");
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

export default PowerKwForm;
