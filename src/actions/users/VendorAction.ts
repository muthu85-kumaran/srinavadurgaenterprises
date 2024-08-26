"use server";
import { Vendor, VendorSchema } from "@/types/Vendor";
import { getErrorMessage } from "@/lib/utils";
import { ZodIssue } from "zod";
import db from "@/db/database";
import { VendorBankDetail } from "@prisma/client";

export const SaveVendorAction = async (newVendor: Vendor) => {
  var responseData: Vendor;
  var error: unknown | string | ZodIssue[];

  const validation = VendorSchema.safeParse(newVendor);

  if (validation.error) {
    error = validation.error.format();
    return { data: null, error, success: false };
  }

  const data = validation.data!!; // Ensure data is not undefined

  try {
    if (validation.success && validation.data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        const bankdetails = [];
        for (const bankDetail of data.bankDetails ?? []) {
          bankdetails.push({
            bankName: bankDetail.bankName,
            accountNo: bankDetail.accountNo,
            branchName: bankDetail.branchName,
            ifscCode: bankDetail.ifscCode,
            accountType: bankDetail.accountType,
            vendorId: data.id,
            id: bankDetail.id,
          });
        }

        if (data.bankDetails) {
          await db.vendorBankDetail.deleteMany({
            where: { vendorId: data.id as string },
          });
          await db.vendorBankDetail.createMany({
            data: [...(bankdetails as VendorBankDetail[])],
          });
        }

        const updatedvendor = await db.vendor.update({
          where: { id: data.id as string },
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
            country: data.country,
          },
          include: { vendorBankDetail: true },
        });

        responseData = updatedvendor as unknown as Vendor;
        return { data: responseData, error, success: true };
      } else {
        data.id = undefined;
        const existingVendor = await db.vendor.findFirst({
          where: { email: data.email, contactNo: data.contactNo },
        });
        if (existingVendor) {
          error = "Vendor already exists with this email/Contact No.";
          return { data: null, error, success: false };
        }
        const bankdetails = [];
        for (const bankDetail of data.bankDetails ?? []) {
          bankdetails.push({
            bankName: bankDetail.bankName,
            accountNo: bankDetail.accountNo,
            branchName: bankDetail.branchName,
            ifscCode: bankDetail.ifscCode,
            accountType: bankDetail.accountType,
          });
        }
        const newvendor = await db.vendor.create({
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
            country: data.country,
            vendorBankDetail: {
              create: [...(bankdetails as VendorBankDetail[])],
            },
          },
          include: { vendorBankDetail: true },
        });
        responseData = newvendor as unknown as Vendor;

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

export const listVendorAction = async () => {
  var data: unknown | Vendor[];
  var error: unknown | string | ZodIssue[];
  try {
    data = await db.vendor.findMany({
      include: { vendorBankDetail: true },
    });
    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export const getVendorAction = async (id: string) => {
  var data: unknown | Vendor;
  var error: unknown | string | ZodIssue[];
  try {
    data = await db.vendor.findUnique({
      where: { id },
      include: { vendorBankDetail: true },
    });
    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};
