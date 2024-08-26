"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { LoaderIcon, PlusIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";

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
import { ChevronsUpDown, Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ZodIssue } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";
import { FaRegSquareCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SaveProductAction } from "@/actions/products/productAction";
import { Product, ProductSchema } from "@/types/Product";
import { cn, getErrorMessage } from "@/lib/utils";
import { PumpSeries } from "@/types/pumpSeries";
import { PumpTypeApp } from "@/types/pumpTypeApp";
import { PumpTypeIns } from "@/types/pumpTypeIns";
import { Phase } from "@/types/phase";
import { PowerHp } from "@/types/powerHp";
import { PowerKw } from "@/types/powerKw";
import { Suction } from "@/types/Suction";
import { Delivery } from "@/types/Delivery";
import { Voltage } from "@/types/Voltage";
import { ProductTax } from "@/types/ProductTax";
import { ProductDiscount } from "@/types/Discount";
import { Product as p } from "@prisma/client";

import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";

type ProductFormProps = {
  Series: PumpSeries[];
  PumpTypeApps: PumpTypeApp[];
  PumpTypeIns: PumpTypeIns[];
  Phases: Phase[];
  PowerHps: PowerHp[];
  PowerKws: PowerKw[];
  Suctions: Suction[];
  Deliveries: Delivery[];
  Voltages: Voltage[];
  Taxes: ProductTax[];
  Discounts: ProductDiscount[];
  Product?: p;
};

const ProductForm = ({
  Series,
  PumpTypeApps,
  PumpTypeIns,
  Phases,
  PowerHps,
  PowerKws,
  Suctions,
  Deliveries,
  Voltages,
  Taxes,
  Discounts,
  Product,
}: ProductFormProps) => {
  const [errors, setErrors] = React.useState<ZodIssue[]>([]);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const frequencies = [
    { id: "50", name: "50 Hz" },
    { id: "60", name: "60 Hz" },
  ];
  const sealingTypes = [
    { id: "Mechanical Seal", name: "Mechanical Seal" },
    { id: "Gland Packing", name: "Gland Packing" },
  ];

  const certifications = [
    { id: "ISI", name: "ISI" },
    { id: "ISO", name: "ISO" },
    { id: "CE", name: "CE" },
    { id: "UL", name: "UL" },
    { id: "CSA", name: "CSA" },
    { id: "ATEX", name: "ATEX" },
    { id: "Others", name: "Others" },
  ];
  const router = useRouter();
  const zodForm = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: Product?.name || "",
      description: Product?.description || "",
      normalPrice: Product?.normalPrice || 0,
      retailPrice: Product?.retailPrice || 0,
      modelNo: Product?.modelNo || "",
      frequency: Product?.frequency || "50",
      noOfStages: Product?.noOfStages || "0",
      grossWeight: Product?.grossWeight || "",
      certification: Product?.certification || "ISI",
      headMinimumM: Product?.headMinimumM || "",
      headMaximumM: Product?.headMaximumM || "",
      sealingType: Product?.sealingType || "",
      isTaxIncludedInPrice: Product?.isTaxIncludedInPrice || false,
      stockQuantity: Product?.stockQuantity || 1,
      minOrderQuantity: Product?.minOrderQuantity || 0,
      hsnCode: Product?.hsnCode || "",
      isAvailable: Product?.isAvailable || true,
      seriesId: Product?.seriesId || "",
      puTypeAppId: Product?.puTypeAppId || "",
      puTypeInstId: Product?.puTypeInstId || "",
      phaseId: Product?.phaseId || "",
      powerHPId: Product?.powerHPId || "",
      ratedVoltId: Product?.ratedVoltId || "",
      powerKWId: Product?.powerKWId || "",
      suctionMMId: Product?.suctionMMId || "",
      deliveryMMId: Product?.deliveryMMId || "",
      productTaxId: Product?.productTaxId || "",
      cessInPercent: Product?.cessInPercent || 0,
      discountId: Product?.discountId || "",

      id: Product?.id || undefined,
    },
    mode: "onBlur",
  });

  const { control, handleSubmit, reset, formState, setValue } = zodForm;
  const { isSubmitting } = formState;

  const processForm: SubmitHandler<z.infer<typeof ProductSchema>> = async (
    data
  ) => {
    const seriesName = Series.find((s) => s.id === data.seriesId)?.name;
    data.name = seriesName + " " + data.modelNo;

    const pumpTypeAppName = PumpTypeApps.find(
      (s) => s.id === data.puTypeAppId
    )?.name;
    const pumpTypeInsName = PumpTypeIns.find(
      (s) => s.id === data.puTypeInstId
    )?.name;
    const phaseName = Phases.find((s) => s.id === data.phaseId)?.name;
    const powerHpName = PowerHps.find(
      (s) => s.id === data.powerHPId
    )?.valueInHP;
    const powerKwName = PowerKws.find(
      (s) => s.id === data.powerKWId
    )?.valueInKW;
    const suctionName = Suctions.find(
      (s) => s.id === data.suctionMMId
    )?.valueSuctionSize;
    const deliveryName = Deliveries.find(
      (s) => s.id === data.deliveryMMId
    )?.valueDeliverySize;
    const voltageName = Voltages.find(
      (s) => s.id === data.ratedVoltId
    )?.valueInVolt;

    data.description = `${seriesName} ${data.modelNo} ${pumpTypeAppName} ${pumpTypeInsName} ${phaseName} phase ${powerHpName} HP ${powerKwName} KW ${suctionName} MM ${deliveryName} MM ${voltageName} Volts`;

    try {
      const result = await SaveProductAction(data);
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
        toast.success("Product Saved Successfully");
        // router.push("/admin/product");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <Form {...zodForm}>
        <form className="space-y-8 mb-4" onSubmit={handleSubmit(processForm)}>
          <div className="grid grid-cols-3 gap-x-8 gap-y-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem hidden={true}>
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem hidden={true}>
                  <FormLabel> Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="seriesId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Pump Series </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          name="seriesId"
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? Series?.find((s) => s.id === field.value)?.name
                            : "Select Pump Series"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Pump series..." />
                        <CommandEmpty>No Pump Series found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {Series?.map((s) => (
                              <CommandItem
                                value={s.name}
                                key={s.id}
                                onSelect={() => {
                                  setValue("seriesId", s.id!!);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    s.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {s.name}
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
              name="modelNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Model Number </FormLabel>
                  <FormControl>
                    <Input placeholder="Model Number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="normalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Price </FormLabel>
                  <FormControl>
                    <Input placeholder="Price" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="retailPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Retail Price </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Retail Price"
                      type="number"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="isTaxIncludedInPrice"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel> Retail Price </FormLabel> */}
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Is Tax(GST) Included In Price
                    </label>
                  </div>
                  <div className="flex gap-3 items-center ">
                    <FormControl>
                      <Checkbox
                        name="isTaxIncludedInPrice"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <p className="text-gray-500">
                      please Tick if GST included in Price Else untick
                    </p>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Stock (Quantity) </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Stock (Quantity)"
                      type="number"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="sealingType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Sealing Type </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? sealingTypes?.find((c) => c.id === field.value)
                                ?.name
                            : "Select Sealing Type"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Sealing type..." />
                        <CommandEmpty>No Sealing type found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {sealingTypes?.map((c) => (
                              <CommandItem
                                value={c.name}
                                key={c.id}
                                onSelect={() => {
                                  setValue("sealingType", c.id);
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
              control={control}
              name="frequency"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Frequency</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? frequencies?.find((c) => c.id === field.value)
                                ?.name
                            : "Select frequency"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search frequency..." />
                        <CommandEmpty>No frequency found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {frequencies?.map((c) => (
                              <CommandItem
                                value={c.name}
                                key={c.id}
                                onSelect={() => {
                                  setValue("frequency", c.id);
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
              control={control}
              name="noOfStages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Number Of Stages </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Number of Stages"
                      type="number"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="grossWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Gross Weight </FormLabel>
                  <FormControl>
                    <Input placeholder="Gross Weight" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="certification"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Certification </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? certifications?.find((c) => c.id === field.value)
                                ?.name
                            : "Select certification"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search certification..." />
                        <CommandEmpty>No Certification found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {certifications?.map((c) => (
                              <CommandItem
                                value={c.name}
                                key={c.id}
                                onSelect={() => {
                                  setValue("certification", c.id);
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
              control={control}
              name="puTypeAppId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Pump Type (Application) </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? PumpTypeApps?.find((c) => c.id === field.value)
                                ?.name
                            : "Select Pump Type Application"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Pump Type Application..." />
                        <CommandEmpty>
                          No Pump Type Application found.
                        </CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {PumpTypeApps?.map((c) => (
                              <CommandItem
                                value={c.name}
                                key={c.id}
                                onSelect={() => {
                                  setValue("puTypeAppId", c.id!);
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
              control={control}
              name="puTypeInstId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Pump Type (Installation) </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? PumpTypeIns?.find((c) => c.id === field.value)
                                ?.name
                            : "Select Pump Type Installation"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Pump Type Installation..." />
                        <CommandEmpty>
                          No Pump Type Installation found.
                        </CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {PumpTypeIns?.map((c) => (
                              <CommandItem
                                value={c.name}
                                key={c.id}
                                onSelect={() => {
                                  setValue("puTypeInstId", c.id!);
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
              control={control}
              name="phaseId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Phase </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? Phases?.find((c) => c.id === field.value)?.name
                            : "Select Phase"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Phase.." />
                        <CommandEmpty>No Phase found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {Phases?.map((c) => (
                              <CommandItem
                                value={c.name}
                                key={c.id}
                                onSelect={() => {
                                  setValue("phaseId", c.id!);
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
              control={control}
              name="powerHPId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Power In HP </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? PowerHps?.find((c) => c.id === field.value)
                                ?.valueInHP
                            : "Select Power In HP"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Power In HP.." />
                        <CommandEmpty>No Power in HP found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {PowerHps?.map((c) => (
                              <CommandItem
                                value={c.valueInHP.toString()}
                                key={c.id}
                                onSelect={() => {
                                  setValue("powerHPId", c.id!);
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
                                {c.valueInHP.toString()}
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
              name="powerKWId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Power In KW </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? PowerKws?.find((c) => c.id === field.value)
                                ?.valueInKW
                            : "Select Power In KW"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Power In KW.." />
                        <CommandEmpty>No Power in KW found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {PowerKws?.map((c) => (
                              <CommandItem
                                value={c.valueInKW.toString()}
                                key={c.id}
                                onSelect={() => {
                                  setValue("powerKWId", c.id!);
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
                                {c.valueInKW.toString()}
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
              name="suctionMMId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Suction Size In MM </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? Suctions?.find((c) => c.id === field.value)
                                ?.valueSuctionSize
                            : "Select Suction Size In MM"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Suction Size In MM.." />
                        <CommandEmpty>
                          No Suction Size in MM found.
                        </CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {Suctions?.map((c) => (
                              <CommandItem
                                value={c.valueSuctionSize.toString()}
                                key={c.id}
                                onSelect={() => {
                                  setValue("suctionMMId", c.id!);
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
                                {c.valueSuctionSize.toString()}
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
              name="deliveryMMId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Delivery Size In MM </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? Deliveries?.find((c) => c.id === field.value)
                                ?.valueDeliverySize
                            : "Select Delivery Size In MM"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Delivery Size In MM.." />
                        <CommandEmpty>
                          No Delivery Size in MM found.
                        </CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {Deliveries?.map((c) => (
                              <CommandItem
                                value={c.valueDeliverySize.toString()}
                                key={c.id}
                                onSelect={() => {
                                  setValue("deliveryMMId", c.id!);
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
                                {c.valueDeliverySize.toString()}
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
              name="ratedVoltId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Rated Voltage In volts </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? Voltages?.find((c) => c.id === field.value)
                                ?.valueInVolt
                            : "Select Voltage In Volts"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Voltage In Volts.." />
                        <CommandEmpty>No Voltages in Volts found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {Voltages?.map((c) => (
                              <CommandItem
                                value={c.valueInVolt.toString()}
                                key={c.id}
                                onSelect={() => {
                                  setValue("ratedVoltId", c.id!);
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
                                {c.valueInVolt.toString()}
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
              name="headMinimumM"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Head Size (Minimum in M) </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} type="number" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="headMaximumM"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Head Size (Maximum in M) </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} type="number" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="hsnCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> HSN Code </FormLabel>
                  <FormControl>
                    <Input placeholder="HSN Code" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="productTaxId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tax(GST) % </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? Taxes?.find((c) => c.id === field.value)
                                ?.taxInPercent
                            : "Select Tax"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Tax.." />
                        <CommandEmpty>No Tax found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {Taxes?.map((c) => (
                              <CommandItem
                                value={c.taxInPercent.toString()}
                                key={c.id}
                                onSelect={() => {
                                  setValue("productTaxId", c.id!);
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
                                {c.taxInPercent.toString()}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Link
                    href={"/admin/product/tax/add"}
                    className="flex justify-center cursor-pointer "
                  >
                    <FaPlusCircle
                      className="text-green-900"
                      size={18}
                    ></FaPlusCircle>
                  </Link>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="cessInPercent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cess In Percentage</FormLabel>
                  <FormControl>
                    <Input placeholder="Cess In Percentage" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="discountId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Discount In Percentage/Amount </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? Discounts.find((c) => c.id === field.value)
                                ?.discountInAmount
                              ? Discounts.find((c) => c.id === field.value)
                                  ?.discountInAmount + " Rs"
                              : Discounts.find((c) => c.id === field.value)
                                  ?.discountInPercent + " %"
                            : "Select Discount"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Discount.." />
                        <CommandEmpty>No Dicounts found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {Discounts.map((c) => (
                              <CommandItem
                                value={
                                  c.discountInPercent != 0 &&
                                  c.discountInPercent
                                    ? `${c.discountInPercent!.toString()}`
                                    : `${c.discountInAmount!.toString()}`
                                }
                                key={c.id}
                                onSelect={() => {
                                  setValue("discountId", c.id!);
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

                                {c.discountInPercent != 0 && c.discountInPercent
                                  ? `${c.discountInPercent!.toString()} %`
                                  : `${c.discountInAmount!.toString()} Rs`}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Link
                    href={"/admin/product/discount/add"}
                    className="flex justify-center"
                  >
                    <FaPlusCircle
                      className="text-green-900"
                      size={18}
                    ></FaPlusCircle>
                  </Link>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel> Retail Price </FormLabel> */}
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Is Available
                    </label>
                  </div>
                  <div className="flex gap-3 items-center ">
                    <FormControl>
                      <Checkbox
                        name="isAvailable"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <p className="text-gray-500">
                      please Tick if Available Else untick
                    </p>
                  </div>

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
            <Button
              type="submit"
              className="flex gap-2"
              disabled={isSubmitting}
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
                router.push("/admin/product");
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

export default ProductForm;
