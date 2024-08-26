"use client";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BankDetailForm = ({
  index,
  control,
  remove,
}: {
  index: number;
  control: any;
  remove: (index: number) => void;
}) => {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
      <FormField
        control={control}
        name={`bankDetails.${index}.bankName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel> Bank Name </FormLabel>
            <FormControl>
              <Input placeholder="Bank Name" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`bankDetails.${index}.accountNo`}
        render={({ field }) => (
          <FormItem>
            <FormLabel> Account No </FormLabel>
            <FormControl>
              <Input placeholder="Account No" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`bankDetails.${index}.branchName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel> IFSC Code </FormLabel>
            <FormControl>
              <Input placeholder="IFSC Code" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`bankDetails.${index}.ifscCode`}
        render={({ field }) => (
          <FormItem>
            <FormLabel> Branch Name </FormLabel>
            <FormControl>
              <Input placeholder="Branch Name" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`bankDetails.${index}.accountType`}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Account Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="SAVINGS" />
                  </FormControl>
                  <FormLabel className="font-normal">SAVINGS</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="CURRENT" />
                  </FormControl>
                  <FormLabel className="font-normal">CURRENT</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="col-span-2">
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            remove(index);
          }}
          className="text-red-500 hover:text-red-700 flex gap-2 items-center"
          variant="outline"
        >
          <FaRegTrashAlt />
          <span>Remove</span>
        </Button>
      </div>
    </div>
  );
};

export default BankDetailForm;
