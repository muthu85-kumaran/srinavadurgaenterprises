"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
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
import { SaveProductTaxAction } from "@/actions/products/ProductTaxAction";
import { ProductTax, ProductTaxSchema } from "@/types/ProductTax";
import { getErrorMessage } from "@/lib/utils";

type ProductTaxFormProps = {
  ProductTax?: ProductTax;
};

const ProductTaxForm = ({ ProductTax }: ProductTaxFormProps) => {
  const [errors, setErrors] = React.useState<ZodIssue[]>([]);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const router = useRouter();
  const formData = useForm<z.infer<typeof ProductTaxSchema>>({
    resolver: zodResolver(ProductTaxSchema),
    defaultValues: {
      taxInPercent: ProductTax?.taxInPercent || 0,
      taxName: ProductTax?.taxName || "",
      effectiveDate: ProductTax?.effectiveDate || undefined,
      id: ProductTax?.id || undefined,
    },
  });

  const formAction = async (formData: FormData) => {
    const newProductTax = {
      taxInPercent: formData.get("taxInPercent"),
      taxName: formData.get("taxName"),
      effectiveDate: formData.get("effectiveDate"),
      id: formData.get("id") || undefined,
    };
    //client side validation
    const validation = await ProductTaxSchema.safeParseAsync(newProductTax);
    if (!validation.success && validation.error.errors.length > 0) {
      setErrors(validation.error.issues as ZodIssue[]);
      return;
    }
    //post data to server
    const result = await SaveProductTaxAction(validation.data);
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
      // router.push("/admin/producttax");
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
              name="taxName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Tax Name </FormLabel>
                  <FormControl>
                    <Input placeholder="ex: GST @ 18%" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formData.control}
              name="taxInPercent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Tax (GST) In Percentage </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Tax(GST) In Percentage"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formData.control}
              name="effectiveDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Effective Date </FormLabel>
                  <FormControl>
                    <DateTimePicker
                      // minDate={new Date()}
                      format="dd/MM/yyyy hh:mm a"
                      className="border-red-300 border-1 rounded-md"
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                    />
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
                router.push("/admin/product/tax");
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

export default ProductTaxForm;
