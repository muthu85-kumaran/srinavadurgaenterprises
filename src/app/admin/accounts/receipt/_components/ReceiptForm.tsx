"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn, getErrorMessage, getFormattedCurrency } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown, Check, Loader, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ZodIssue } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";
import { FaRegSquareCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import toast, { LoaderIcon } from "react-hot-toast";
import { Receipt, ReceiptSchema } from "@/types/receipt";
import { format, set } from "date-fns";
import {
  saveReceipt,
  getReceiptsByInvoiceId,
  getReceiptsBySalesOrderId,
} from "@/actions/accounts/ReceiptAction";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Customer,
  PaymentMode,
  SalesInvoice,
  SalesOrder,
} from "@prisma/client";
import { SalesInvoiceSchema } from "@/types/SalesInvoice";
import { Label } from "@/components/ui/label";
import { get } from "http";

interface ReceiptFormProps {
  customers: Customer[];
  salesInvoices: SalesInvoice[];
  salesOrders: SalesOrder[];
  paymentModes: PaymentMode[];
}

const ReceiptForm = ({
  customers,
  salesInvoices,
  salesOrders,
  paymentModes,
}: ReceiptFormProps) => {
  const [paidAmount, setPaidAmount] = React.useState<number>(0);
  const [NoBalance, setNoBalance] = React.useState<boolean>(false);
  const [balance, setBalance] = React.useState<number>(0);
  const zodform = useForm<z.infer<typeof ReceiptSchema>>({
    resolver: zodResolver(ReceiptSchema),
    defaultValues: {
      customerId: "",
      invoiceId: "",
      salesOrderId: "",
      amount: 0,
      paymentModeId: "",
      receiptDate: new Date(),
      referenceNo: "",
    },
    mode: "onChange",
  });
  const router = useRouter();
  const processform = async (data: Receipt) => {
    try {
      const result = await saveReceipt(data);
      if (!result) {
        toast.error("An error occurred while saving data");
        return;
      }
      if (result.error) {
        toast.error(getErrorMessage(result.error));
        return;
      }
      if (result.success) {
        zodform.reset();
        toast.success("Receipt saved successfully");
        router.push("/admin/receipt");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
      // toast.error("An error occurred while saving data");
    }
  };
  const [errors, setErrors] = React.useState<ZodIssue[]>([]);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  if (!zodform.getValues("paymentModeId")) {
    zodform.setValue(
      "paymentModeId",
      paymentModes.find((c) => c.name === "CASH")?.id || ""
    );
  }

  return (
    <>
      <Form {...zodform}>
        <form
          onSubmit={zodform.handleSubmit(processform)}
          className="space-y-2 mb-4"
        >
          <div className="bg-lime-300 p-3">
            <p className="text-stone-800">Receipt </p>
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            <FormField
              control={zodform.control}
              name="receiptDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Receipt Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PP")
                          ) : (
                            <span>Sales Invoice Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={zodform.control}
              name="paymentModeId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Mode of Payment</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex  space-y-1"
                    >
                      {paymentModes?.map((mode) => (
                        <FormItem
                          key={mode.id}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={mode.id} />
                          </FormControl>
                          <FormLabel>{mode.name}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={zodform.control}
              name="invoiceId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Sales Invoice No </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          name="invoiceId"
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-46 justify-between border-2 border-violet-500 hover:border-green-500",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? salesInvoices?.find((c) => c.id === field.value)
                                ?.invoiceNo
                            : "Select sales invoice"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-46 p-0">
                      <Command>
                        <CommandInput placeholder="Search Sales Invoice Number..." />
                        <CommandEmpty>
                          No Sales Invoice Number found.
                        </CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {salesInvoices?.map((c) => (
                              <CommandItem
                                value={c.id}
                                key={c.id}
                                onSelect={() => {
                                  zodform.setValue("salesOrderId", "");
                                  zodform.setValue("invoiceId", c.id);
                                  zodform.setValue("customerId", c.customerId);
                                  getReceiptsByInvoiceId(
                                    c.id,
                                    c.salesOrderId ?? ""
                                  )
                                    .then((res) => {
                                      const totalreceipt =
                                        res.data?.reduce((acc, item) => {
                                          return acc + item.amount;
                                        }, 0) || 0;

                                      zodform.setValue(
                                        "amount",
                                        c.invoiceTotalAmount - totalreceipt
                                      );
                                      if (
                                        totalreceipt == c.invoiceTotalAmount
                                      ) {
                                        setNoBalance(true);
                                        zodform.setValue("amount", 0);
                                        setBalance(0);
                                      } else {
                                        setBalance(
                                          c.invoiceTotalAmount - totalreceipt
                                        );
                                        setNoBalance(false);
                                      }
                                      setPaidAmount(totalreceipt);
                                    })
                                    .catch((error) => {
                                      toast.error("An error occurred");
                                      console.log(error);
                                    });

                                  zodform.setValue(
                                    "salesOrderId",
                                    c.salesOrderId || ""
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    c.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {c.invoiceNo}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={zodform.control}
              name="salesOrderId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Sales Order Number </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          name="customerId"
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-46 justify-between border-2 border-violet-500 hover:border-green-500",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? salesOrders?.find((c) => c.id === field.value)
                                ?.orderNo
                            : "Select Sales Order Number"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-46 p-0">
                      <Command>
                        <CommandInput placeholder="Search Sales order Number..." />
                        <CommandEmpty>
                          No Sales Order Number found.
                        </CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {salesOrders?.map((c) => (
                              <CommandItem
                                value={c.id}
                                key={c.id}
                                onSelect={() => {
                                  zodform.setValue("salesOrderId", c.id);
                                  zodform.setValue("customerId", c.customerId);
                                  zodform.setValue("invoiceId", "");
                                  getReceiptsBySalesOrderId(c.id)
                                    .then((res) => {
                                      const totalreceipt =
                                        res.data?.reduce((acc, item) => {
                                          return acc + item.amount;
                                        }, 0) || 0;

                                      zodform.setValue(
                                        "amount",
                                        c.orderTotalAmount - totalreceipt
                                      );
                                      if (totalreceipt == c.orderTotalAmount) {
                                        setNoBalance(true);
                                        setBalance(0);
                                        zodform.setValue("amount", 0);
                                      } else {
                                        setBalance(
                                          c.orderTotalAmount - totalreceipt
                                        );
                                        setNoBalance(false);
                                      }
                                      setPaidAmount(totalreceipt);
                                    })
                                    .catch((error) => {
                                      toast.error("An error occurred");
                                      console.log(error);
                                    });

                                  zodform.setValue(
                                    "amount",
                                    c.orderTotalAmount
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    c.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {c.orderNo}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={zodform.control}
              name="customerId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Customer </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          name="customerId"
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-46 justify-between border-2 border-violet-500 hover:border-green-500",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? customers?.find((c) => c.id === field.value)?.name
                            : "Select Customer"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-46 p-0">
                      <Command>
                        <CommandInput placeholder="Search Customer..." />
                        <CommandEmpty>No Customer found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {customers?.map((c) => (
                              <CommandItem
                                value={c.id}
                                key={c.id}
                                onSelect={() => {
                                  zodform.setValue("customerId", c.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    c.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {c.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={zodform.control}
              name="referenceNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference No </FormLabel>
                  <FormControl>
                    <Input placeholder="reference no" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={zodform.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payable Amount </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="amount"
                      {...field}
                      disabled={NoBalance}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Label className="text-blue-800">
              Paid Amount{" "}
              <span className="text-green-800">
                {getFormattedCurrency(paidAmount)}
              </span>
            </Label>
            <Label className="text-blue-800">
              Balance{" "}
              <span className="text-red-800">
                {getFormattedCurrency(balance)}
              </span>
            </Label>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="flex gap-2"
              disabled={zodform.formState.isSubmitting}
              // onClick={(e) => {
              //   e.preventDefault();
              //   console.log(ReceiptSchema.parse(zodform.getValues()));
              // }}
            >
              {zodform.formState.isSubmitting ? (
                <div className="flex gap-2">
                  <LoaderIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />{" "}
                  <span>Saving... </span>
                </div>
              ) : (
                <span>Save Changes</span>
              )}
            </Button>

            <Button
              onClick={(e) => {
                zodform.reset();
              }}
              className="ml-4"
              variant={"reset"}
              disabled={zodform.formState.isSubmitting}
            >
              Reset
            </Button>

            <Button
              variant={"cancel"}
              type="button"
              className="ml-4 "
              disabled={zodform.formState.isSubmitting}
              onClick={() => {
                zodform.reset();
                setErrors([]);
                setSuccessMessage(null);
                router.push("/admin/accounts/receipt");
              }}
            >
              Close
            </Button>
          </div>
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
        </form>
      </Form>
    </>
  );
};
export default ReceiptForm;
