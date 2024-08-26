"use server";
import { Customer, CustomerSchema } from "@/types/Customer";
import { getErrorMessage } from "@/lib/utils";
import { ZodIssue } from "zod";
import db from "@/db/database";

export const SaveCustomerAction = async (newCustomer: Customer) => {
  var responseData: unknown | Customer;
  var error: unknown | string | ZodIssue[];

  const validation = CustomerSchema.safeParse(newCustomer);

  if (validation.error) {
    error = validation.error.format();
    return { data: null, error, success: false };
  }

  const data = validation.data!!; // Ensure data is not undefined

  try {
    if (validation.success && validation.data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        responseData = await db.customer.update({
          where: { id: data.id as string },
          data: data,
        });
        return { data: responseData, error, success: true };
      } else {
        data.id = undefined;
        const existingCustomer = await db.customer.findFirst({
          where: { email: data.email, contactNo: data.contactNo },
        });
        if (existingCustomer) {
          error = "Customer already exists with this email/Contact No.";
          return { data: null, error, success: false };
        }

        responseData = await db.customer.create({
          data: {
            name: data.name,
            companyName: data.companyName,
            balanceType: data.balanceType,
            openingBalance: data.openingBalance,
            gstin: data.gstin,
            pan: data.pan,
            email: data.email,
            contactNo: data.contactNo,
            address: data.address,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            country: data.country || "IN",
            userId: data.userId,
          },
        });
        return { data: responseData, error, success: true };
      }
    } else {
      error = "Please Enter a valid Data.";
      return { data: null, error, success: false };
    }
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const listCustomerAction = async () => {
  var data: unknown | Customer[];
  var error: unknown | string | ZodIssue[];
  try {
    data = await db.customer.findMany();
    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const getCustomerAction = async (id: string) => {
  var data: unknown | Customer;
  var error: unknown | string | ZodIssue[];
  try {
    data = await db.customer.findUnique({ where: { id } });
    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};
