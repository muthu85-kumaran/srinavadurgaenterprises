"use client";
import React, { Component, FormEvent, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { CalendarIcon, LoaderIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown, Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ZodIssue } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";
import { FaRegSquareCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SaveSalesInvoiceAction } from "@/actions/sales/SalesInvoiceAction";
import {
  cn,
  getErrorMessage,
  getFormattedCurrency,
  getSubTotalAmount,
  getTotalAmount,
  gettaxAmount,
} from "@/lib/utils";

import { Textarea } from "@/components/ui/textarea";
import { getAllCitiesOfState } from "@/actions/countryAction";
import { SalesInvoiceSchema } from "@/types/SalesInvoice";

import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableHeader,
  TableFooter,
} from "@/components/ui/table";
import { FaRegTrashAlt } from "react-icons/fa";
import { Customer, PaymentMode } from "@prisma/client";
import { format, set } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IState } from "country-state-city";
import { SalesOrder } from "@/actions/sales/SalesOrderAction";

type SalesInvoiceFormProps = {
  products: any[];
  PaymentModes: PaymentMode[];
  Customers: Customer[];
  orders: SalesOrder[];
  states: IState[];
};

const SalesInvoiceForm = ({
  products,
  PaymentModes,
  Customers,
  orders,
  states,
}: SalesInvoiceFormProps) => {
  const componentRef = useRef(null);
  // const [open, setOpen] = React.useState(false);
  const [pvalue, setPValue] = React.useState("");
  const [errors, setErrors] = React.useState<ZodIssue[]>([]);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const [cities, setCities] = React.useState<any[]>([]);

  const fetchCities = async (isoCode: string) => {
    const cities = await getAllCitiesOfState(isoCode);
    setCities(cities);
  };

  useEffect(() => {
    fetchCities("TN");
  }, []);
  const router = useRouter();
  const zodForm = useForm<z.infer<typeof SalesInvoiceSchema>>({
    resolver: zodResolver(SalesInvoiceSchema),
    defaultValues: {
      invoiceNo: "",
      invoiceDate: new Date(),
      invoiceGrossAmount: 0,
      invoiceTotalAmount: 0,
      customerId: "",
      billingAddressId: "",
      shippingAddressId: "",
      invoiceItems: [],
      paymentModeId: "",
      // billingAddress: {
      //   state: "TN",
      //   city: "Villupuram",
      //   pincode: "605602",
      //   country: "India",
      // },

      id: undefined,
    },
    mode: "onChange",
  });

  const arrayfield = useFieldArray({
    name: "invoiceItems",
    control: zodForm.control,
  }); //{ fields, append, remove }

  const { control, handleSubmit, reset, formState, setValue } = zodForm;
  const { isSubmitting } = formState;

  if (!zodForm.getValues("paymentModeId")) {
    setValue(
      "paymentModeId",
      PaymentModes.find((c) => c.name === "CASH")?.id || ""
    );
  }

  const changeinput = (
    e: FormEvent<HTMLInputElement>,
    index: number,
    quantity: number,
    price: number,
    discountInAmount: number
  ) => {
    const taxpercent = zodForm.getValues(`invoiceItems.${index}.tax`);
    const tax = gettaxAmount(price, quantity, taxpercent, discountInAmount);
    zodForm.setValue(`invoiceItems.${index}.taxAmount`, tax);

    const subTotalAmount = getSubTotalAmount(
      price,
      quantity,
      discountInAmount || 0
    );
    const totalAmount = getTotalAmount(
      price,
      quantity,
      tax,
      discountInAmount || 0
    );
    zodForm.setValue(`invoiceItems.${index}.subTotalAmount`, subTotalAmount);
    zodForm.setValue(`invoiceItems.${index}.totalAmount`, totalAmount);
    getInvoiceGrossTotalAmount();
    getInvoiceTotalAmount();
  };

  const getInvoiceGrossTotalAmount = () => {
    const InvoiceItems = zodForm.getValues("invoiceItems");
    const totalGrossAmount = InvoiceItems.reduce(
      (acc: number, item: any) => acc + item.subTotalAmount,
      0
    );
    zodForm.setValue("invoiceGrossAmount", totalGrossAmount);
  };

  const getInvoiceTotalAmount = () => {
    const InvoiceItems = zodForm.getValues("invoiceItems");
    const InvoicetotalAmount = InvoiceItems.reduce(
      (acc: number, item: any) => acc + item.totalAmount,
      0
    );
    zodForm.setValue("invoiceTotalAmount", InvoicetotalAmount);
  };

  function taxdisplay(items: number) {
    var result = [];
    for (let index = 0; index < items; index++) {
      const currenttax = zodForm.getValues(`invoiceItems.${index}.tax`) || 0;
      const currentamount =
        zodForm.getValues(`invoiceItems.${index}.taxAmount`) || 0;
      if (currenttax != 0 && currentamount != 0) {
        if (result.length == 0) {
          result.push({ tax: currenttax, taxAmount: currentamount });
        } else {
          var isexist = false;
          for (let i = 0; i < result.length; i++) {
            if (result[i].tax == currenttax) {
              result[i].taxAmount += currentamount;
              isexist = true;
            }
          }
          if (!isexist) {
            result.push({ tax: currenttax, taxAmount: currentamount });
          }
        }
      }
    }
    return result;
  }

  const processForm: SubmitHandler<z.infer<typeof SalesInvoiceSchema>> = async (
    data
  ) => {
    // console.log(data);
    try {
      const result = await SaveSalesInvoiceAction(data);
      if (!result) {
        toast.error("An error occurred while saving data");
        return;
      }
      if (result.error) {
        toast.error(getErrorMessage(result.error));
        return;
      }
      if (result.success) {
        reset();
        zodForm.setValue("customer.contactNo", "");
        zodForm.setValue("customer.name", "");
        zodForm.setValue("customer.address", "");
        zodForm.setValue("customer.city", "");
        zodForm.setValue("customer.state", "");
        zodForm.setValue("customer.pincode", "");
        toast.success("Sales Invoice Saved Successfully");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <Form {...zodForm}>
        <form className="space-y-2 mb-4" onSubmit={handleSubmit(processForm)}>
          <div className="bg-lime-300 p-3">
            <p className="text-stone-800">Sales Invoice </p>
          </div>
          <div className="grid grid-cols-1  md:grid-cols-4 gap-x-8 gap-y-2">
            <FormField
              control={zodForm.control}
              name="invoiceDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Sales Invoice Date</FormLabel>
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
              control={control}
              name="salesOrderId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Sales Order Number</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          name="salesOrderId"
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-46 justify-between border-2 border-violet-500 hover:border-green-500",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? orders?.find((c) => c.id === field.value)?.orderNo
                            : "Select sales Order Number"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-46 p-0">
                      <Command>
                        <CommandInput placeholder="Search Sales Order Number..." />
                        <CommandEmpty>
                          No Sales Order Number found.
                        </CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {orders?.map((c) => (
                              <CommandItem
                                value={c.id}
                                key={c.id}
                                onSelect={() => {
                                  setValue("salesOrderId", c.id);
                                  setValue("customerId", c.customerId);
                                  setValue(
                                    "customer.contactNo",
                                    c.customer?.contactNo
                                  );
                                  setValue("customer.name", c.customer?.name);
                                  setValue(
                                    "customer.email",
                                    c.customer?.email || ""
                                  );
                                  setValue(
                                    "customer.gstin",
                                    c.customer?.gstin || ""
                                  );
                                  setValue(
                                    "customer.pan",
                                    c.customer?.pan || ""
                                  );
                                  setValue(
                                    "customer.address",
                                    c.customer?.address
                                  );
                                  setValue("customer.state", c.customer?.state);
                                  const cityisocode = states.find(
                                    (s) => c.customer?.state === s.name
                                  )?.isoCode;
                                  fetchCities(cityisocode || "TN");
                                  setValue("customer.city", c.customer?.city);
                                  setValue(
                                    "customer.pincode",
                                    c.customer?.pincode
                                  );
                                  setValue(
                                    "customer.country",
                                    c.customer?.country
                                  );

                                  setValue(
                                    "paymentModeId",
                                    PaymentModes.find(
                                      (p) => p.id === c.paymentModeId
                                    )?.id || ""
                                  );
                                  setValue(
                                    "invoiceTotalAmount",
                                    c.orderTotalAmount
                                  );
                                  setValue(
                                    "invoiceGrossAmount",
                                    c.orderGrossAmount
                                  );

                                  const invoiceitems: any[] = [];
                                  c.orderItems.map((item) => {
                                    invoiceitems.push({
                                      invoiceId: "",
                                      productId: item.productId,
                                      productName: item.product.name,
                                      quantity: item.quantity,
                                      price: item.price,
                                      discountAmount: item.discountAmount,
                                      tax:
                                        item.product.productTax?.taxInPercent ||
                                        0,
                                      taxAmount: item.taxAmount,
                                      subTotalAmount: item.subTotalAmount,
                                      totalAmount: item.totalAmount,
                                    });
                                  });
                                  arrayfield.fields.map((_, index) => {
                                    arrayfield.remove(index);
                                  });
                                  invoiceitems.map((item) => {
                                    arrayfield.append(item);
                                  });
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
              control={zodForm.control}
              name="paymentModeId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Mode of Payment</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      className="grid grid-cols-2  space-y-1"
                    >
                      {PaymentModes?.map((mode) => (
                        <FormItem
                          key={mode.id}
                          className="flex  items-center space-x-3 space-y-0"
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
              control={control}
              name="customer.contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Contact Number </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contact No"
                      {...field}
                      onBlurCapture={(e) => {
                        const contactNo = e.currentTarget.value;

                        Customers?.find((c) => {
                          if (c.contactNo === contactNo) {
                            const cityisocode = states.find(
                              (s) => s.name === c.state
                            )?.isoCode;
                            fetchCities(cityisocode || "TN");
                            setValue("customerId", c.id);
                            setValue("customer.name", c.name);
                            setValue("customer.email", c.email || "");
                            setValue("customer.gstin", c.gstin || "");
                            setValue("customer.pan", c.pan || "");
                            setValue("customer.address", c.address);
                            setValue("customer.state", c.state);
                            setValue("customer.city", c.city);
                            setValue("customer.pincode", c.pincode);
                            setValue("customer.country", "India");
                          }
                        });
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="customer.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="customer.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Address </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Address" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="customer.country"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel> Country </FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="customer.state"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> State </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          name="billingAddress.state"
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-46 justify-between bInvoice-2 bInvoice-violet-500 hover:bInvoice-green-500",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? states?.find((c) => c.name === field.value)?.name
                            : "Select State"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-46 p-0">
                      <Command>
                        <CommandInput placeholder="Search State..." />
                        <CommandEmpty>No State found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {states?.map((c) => (
                              <CommandItem
                                value={c.name}
                                key={c.isoCode}
                                onSelect={() => {
                                  setValue("customer.state", c.name);
                                  fetchCities(c.isoCode);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    c.name === field.value
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
              control={control}
              name="customer.city"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> City </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          name="customer.city"
                          variant="outline"
                          size={"lg"}
                          role="combobox"
                          className={cn(
                            "w-46 justify-between bInvoice-2 bInvoice-violet-500 hover:bInvoice-green-500",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? cities?.find((c) => c.name === field.value)?.name
                            : "Select City"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-46 p-0">
                      <Command>
                        <CommandInput placeholder="Search City..." />
                        <CommandEmpty>No City found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {cities?.map((c) => (
                              <CommandItem
                                value={c.name}
                                key={c.name}
                                onSelect={() => {
                                  setValue("customer.city", c.name);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    c.name === field.value
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
              control={control}
              name="customer.pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Pincode </FormLabel>
                  <FormControl>
                    <Input placeholder="Pincode" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="customer.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> E-Mail </FormLabel>
                  <FormControl>
                    <Input placeholder="E-Mail" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="customer.gstin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> GSTIN </FormLabel>
                  <FormControl>
                    <Input placeholder="GSTIN" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="customer.pan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> PAN </FormLabel>
                  <FormControl>
                    <Input placeholder="PAN" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="bg-lime-300 p-3 flex justify-flex items-center gap-3">
            <p className="text-stone-800">Select Products to Item</p>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  name="pro"
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-46 justify-between bInvoice-2 bInvoice-violet-500 hover:bInvoice-green-500"
                    // !field.value && "text-muted-foreground"
                  )}
                >
                  {products?.find((p) => p.modelNo === pvalue)?.name ||
                    "Select Product"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-46 p-0">
                <Command>
                  <CommandInput placeholder="Search product..." />
                  <CommandEmpty>No Product found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {products?.map((p) => (
                        <CommandItem
                          value={p.modelNo}
                          key={p.modelNo}
                          onSelect={() => {
                            setPValue(p.modelNo);
                            const taxAmount = gettaxAmount(
                              p.normalPrice,
                              1,
                              p.taxInPercent,
                              p.discount?.discountInAmount
                            );

                            arrayfield.append({
                              invoiceId: "",
                              productId: p.id,
                              productName: p.name,
                              quantity: 1,
                              price: p.normalPrice,
                              tax: p.productTax?.taxInPercent || 0,
                              discountAmount: p.discount?.discountInAmount || 0,
                              taxAmount: gettaxAmount(
                                p.normalPrice,
                                1,
                                p.productTax?.taxInPercent || 0,
                                p.discount?.discountInAmount || 0
                              ),
                              subTotalAmount: getSubTotalAmount(
                                p.normalPrice,
                                1,
                                p.discount?.discountInAmount || 0
                              ),

                              totalAmount: getTotalAmount(
                                p.normalPrice,
                                1,
                                taxAmount,
                                p.discount?.discountInAmount || 0
                              ),
                            });
                            getInvoiceGrossTotalAmount();
                            getInvoiceTotalAmount();
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              p.modelNo === pvalue ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {p.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <Table className="w-full bInvoice bInvoice-gray-300">
            <TableHeader>
              <TableRow>
                <TableCell className="hidden">Product Id</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity(Nos)</TableCell>
                <TableCell>Price(&#x20b9;)</TableCell>
                <TableCell>Discount(&#x20b9;) per Qty</TableCell>
                <TableCell>Tax(%)</TableCell>
                <TableCell>Taxable Amount(&#x20b9;)</TableCell>
                <TableCell>Amount(&#x20b9;)</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {arrayfield.fields.map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="hidden">
                    <FormField
                      control={control}
                      name={`invoiceItems.${index}.productId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Product Id" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={control}
                      name={`invoiceItems.${index}.productName`}
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input placeholder="Product Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {zodForm.getValues(`invoiceItems.${index}.productName`)}
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={control}
                      name={`invoiceItems.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="w-20"
                              placeholder="Quantity"
                              {...field}
                              onChangeCapture={(e) => {
                                const quantity = Number(e.currentTarget.value);
                                const price = zodForm.getValues(
                                  `invoiceItems.${index}.price`
                                );
                                const discountInAmount = zodForm.getValues(
                                  `invoiceItems.${index}.discountAmount`
                                );
                                changeinput(
                                  e,
                                  index,
                                  quantity,
                                  price,
                                  discountInAmount
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={control}
                      name={`invoiceItems.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="w-24"
                              placeholder="Price"
                              {...field}
                              onChangeCapture={(e) => {
                                const quantity = zodForm.getValues(
                                  `invoiceItems.${index}.quantity`
                                );
                                const price = Number(e.currentTarget.value);
                                const discountInAmount = zodForm.getValues(
                                  `invoiceItems.${index}.discountAmount`
                                );
                                changeinput(
                                  e,
                                  index,
                                  quantity,
                                  price,
                                  discountInAmount
                                );
                              }}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={control}
                      name={`invoiceItems.${index}.discountAmount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="w-24"
                              placeholder="Discount Amount"
                              {...field}
                              onChangeCapture={(e) => {
                                const quantity = zodForm.getValues(
                                  `invoiceItems.${index}.quantity`
                                );
                                const price = zodForm.getValues(
                                  `invoiceItems.${index}.price`
                                );
                                const discountInAmount = Number(
                                  e.currentTarget.value
                                );
                                changeinput(
                                  e,
                                  index,
                                  quantity,
                                  price,
                                  discountInAmount
                                );
                              }}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <FormField
                      control={control}
                      name={`invoiceItems.${index}.taxAmount`}
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input
                              disabled={true}
                              placeholder="Tax Amount"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {zodForm.getValues(`invoiceItems.${index}.tax`) || 0}%
                  </TableCell>
                  <TableCell className="text-right">
                    <FormField
                      control={control}
                      name={`invoiceItems.${index}.subTotalAmount`}
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input placeholder="Sub Total Amount" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {getFormattedCurrency(
                      zodForm.getValues(
                        `invoiceItems.${index}.subTotalAmount`
                      ) || 0
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <FormField
                      control={control}
                      name={`invoiceItems.${index}.totalAmount`}
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input placeholder="Total Amount" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {getFormattedCurrency(
                      zodForm.getValues(`invoiceItems.${index}.totalAmount`) ||
                        0
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        arrayfield.remove(index);
                        getInvoiceGrossTotalAmount();
                        getInvoiceTotalAmount();
                      }}
                      className="text-red-500 hover:text-red-700 flex gap-2 items-center"
                      variant="outline"
                    >
                      <FaRegTrashAlt />
                      <span>Remove</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7} className="text-right">
                  {taxdisplay(zodForm.getValues("invoiceItems").length).map(
                    (item: any, index: number) => (
                      <div key={index}>
                        <p>
                          CGST ({item.tax / 2}%): &nbsp;
                          {getFormattedCurrency(item.taxAmount / 2)}
                        </p>
                        <p key={index}>
                          SGST ({item.tax / 2}%): &nbsp;
                          {getFormattedCurrency(item.taxAmount / 2)}
                        </p>
                        <p>
                          Total Tax (GST {item.tax}%):&nbsp;
                          {getFormattedCurrency(item.taxAmount)}
                        </p>
                      </div>
                    )
                  )}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} className="text-right">
                  Total
                </TableCell>
                <TableCell className="text-right">
                  <FormField
                    control={control}
                    name="invoiceGrossAmount"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormLabel> Gross Amount(&#x20b9;) </FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            {...field}
                            className="text-right"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {zodForm.getValues("invoiceItems").length > 0 &&
                    getFormattedCurrency(
                      zodForm.getValues("invoiceGrossAmount")
                    )}
                </TableCell>

                <TableCell className="text-right">
                  <FormField
                    control={control}
                    name="invoiceTotalAmount"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormLabel> Total Amount(&#x20b9;) </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Total Amount"
                            {...field}
                            className="text-right"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {zodForm.getValues("invoiceItems").length > 0 &&
                    getFormattedCurrency(
                      zodForm.getValues("invoiceTotalAmount")
                    )}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="flex gap-2"
              disabled={isSubmitting}
              // onClick={(e) => {
              //   e.preventDefault();
              //   console.log(SalesInvoiceSchema.safeParse(zodForm.getValues()));
              // }}
            >
              {isSubmitting ? (
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
                router.push("/admin/sales");
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

export default SalesInvoiceForm;
