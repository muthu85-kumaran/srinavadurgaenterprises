"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { SaveVendorAction } from "@/actions/users/VendorAction";
import { cn, getErrorMessage } from "@/lib/utils";
import { VendorSchema } from "@/types/Vendor";
import { Vendor, VendorBankDetail } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import {
  getAllCountries,
  getAllCitiesOfState,
  getAllStatesOfIndia,
} from "@/actions/countryAction";
import BankDetailForm from "./BankDetailForm";

type VendorFormProps = {
  Vendor?: {
    name: string;
    companyName: string;
    balanceType: string;
    openingBalance: number;
    gstin: string;
    pan: string;
    email: string;
    contactNo: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    vendorBankDetail: VendorBankDetail[];
    id: string;
  };
};

const VendorForm = ({ Vendor }: VendorFormProps) => {
  const [errors, setErrors] = React.useState<ZodIssue[]>([]);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );
  const [countries, setCountries] = React.useState<any[]>([]);
  const [states, setStates] = React.useState<any[]>([]);
  const [cities, setCities] = React.useState<any[]>([]);

  const fetchCities = async (isoCode: string) => {
    const cities = await getAllCitiesOfState(isoCode);
    setCities(cities);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getAllCountries();
      setCountries(countries);
    };
    fetchCountries();
    const fetchStates = async () => {
      const states = await getAllStatesOfIndia();
      setStates(states);
    };
    fetchStates();
    if (Vendor?.state) {
      fetchCities(Vendor?.state);
    } else {
      fetchCities("TN");
    }
  }, []);
  const [bankdetailscount, setBankDetailsCount] = React.useState(0);

  const router = useRouter();

  const zodForm = useForm<z.infer<typeof VendorSchema>>({
    resolver: zodResolver(VendorSchema),
    defaultValues: {
      name: Vendor?.name || "",
      companyName: Vendor?.companyName || "",
      balanceType: Vendor?.balanceType || "",
      openingBalance: Vendor?.openingBalance || 0,
      gstin: Vendor?.gstin || "",
      pan: Vendor?.pan || "",
      email: Vendor?.email || "",
      contactNo: Vendor?.contactNo || "",
      address: Vendor?.address || "",
      city: Vendor?.city || "Villupuram",
      state: Vendor?.state || "TN",
      pincode: Vendor?.pincode || "",
      country: Vendor?.country || "IN",
      bankDetails: Vendor?.vendorBankDetail || [],

      id: Vendor?.id || undefined,
    },
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    name: "bankDetails",
    control: zodForm.control,
  });

  const { control, handleSubmit, reset, formState, setValue } = zodForm;
  const { isSubmitting } = formState;

  const processForm: SubmitHandler<z.infer<typeof VendorSchema>> = async (
    data
  ) => {
    try {
      const result = await SaveVendorAction(data);
      if (!result) {
        toast.error("An error occurred while saving data");
        return;
      }
      if (result.error) {
        toast.error(getErrorMessage(result.error));
        return;
      }
      if (result.success) {
        // reset();
        if (Vendor?.id) {
          toast.success("Vendor Updated Successfully");
        } else {
          reset();
          toast.success("Vendor Saved Successfully");
        }
        router.refresh();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <Form {...zodForm}>
        <form className="space-y-8 mb-4" onSubmit={handleSubmit(processForm)}>
          <div className="bg-lime-300 p-3">
            <p className="text-stone-800">Vendor Details </p>
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Name </FormLabel>
                  <FormControl>
                    <Input placeholder="Vendor Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Company Name </FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="gstin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> GSTIN</FormLabel>
                  <FormControl>
                    <Input placeholder="GSTIN" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="pan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> PAN</FormLabel>
                  <FormControl>
                    <Input placeholder="PAN" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Contact No </FormLabel>
                  <FormControl>
                    <Input placeholder="Contact No" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Email </FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Country </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          name="country"
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-46 justify-between border-2 border-violet-500 hover:border-green-500",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? countries?.find((c) => c.isoCode === field.value)
                                ?.name
                            : "Select Country"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-46 p-0">
                      <Command>
                        <CommandInput placeholder="Search Country..." />
                        <CommandEmpty>No Country found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {countries?.map((c) => (
                              <CommandItem
                                value={c.name}
                                key={c.isoCode}
                                onSelect={() => {
                                  setValue("country", c.isoCode);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    c.isoCode === field.value
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
              name="state"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> State </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          name="state"
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-46 justify-between border-2 border-violet-500 hover:border-green-500",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? states?.find((c) => c.isoCode === field.value)
                                ?.name
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
                                  setValue("state", c.isoCode);
                                  fetchCities(c.isoCode);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    c.isoCode === field.value
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
              name="city"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> City </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          name="city"
                          variant="outline"
                          size={"lg"}
                          role="combobox"
                          className={cn(
                            "w-46 justify-between border-2 border-violet-500 hover:border-green-500",
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
                                  setValue("city", c.name);
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
              name="address"
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
              name="pincode"
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
              name="balanceType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Opening Balance Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="CREDIT" />
                        </FormControl>
                        <FormLabel className="font-normal">CREDIT</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="DEBIT" />
                        </FormControl>
                        <FormLabel className="font-normal">DEBIT</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="openingBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Opening Balance </FormLabel>
                  <FormControl>
                    <Input placeholder="Opening Balance" {...field} />
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

          <div className="bg-lime-300 p-3 flex justify-between items-center">
            <p className="text-stone-800">Bank Details </p>
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                append({
                  bankName: "",
                  accountNo: "",
                  ifscCode: "",
                  branchName: "",
                  accountType: "",
                });
              }}
              className="ml-4 text-green-900"
              variant={"ghost"}
            >
              + Add Bank Details
            </Button>
          </div>
          <div className="w-full">
            {fields.map((_, index) => (
              <div key={index}>
                <BankDetailForm
                  index={index}
                  control={control}
                  remove={() => {
                    remove(index);
                  }}
                />
              </div>
            ))}
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
            {!Vendor?.id && (
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
            )}

            <Button
              variant={"cancel"}
              type="button"
              className="ml-4 "
              disabled={isSubmitting}
              onClick={() => {
                reset();
                setErrors([]);
                setSuccessMessage(null);
                router.push("/admin/vendor");
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

export default VendorForm;
