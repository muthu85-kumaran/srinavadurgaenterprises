import { constants } from "buffer";
import * as z from "zod";

const VendorBankDetailObject = z.object({
  bankName: z
    .string()
    .min(5, "Bank Name must be at least 5 characters long")
    .optional(),
  accountNo: z
    .string()
    .min(5, "Account Number must be at least 5 characters long")
    .optional(),
  ifscCode: z
    .string()
    .min(5, "IFSC must be at least 5 characters long")
    .optional(),
  branchName: z
    .string()
    .min(5, "Branch Name must be at least 5 characters long")
    .optional(),
  accountType: z.string().optional(),
  vendorId: z.string().optional(),
  id: z.string().optional(),
});

export const VendorSchema = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 character long")
    .max(100, "Name must be at most 100 characters long"),
  companyName: z.string().optional(),

  balanceType: z.string().optional(),
  openingBalance: z
    .preprocess((val) => {
      return Number(val);
    }, z.number())
    .optional(),
  gstin: z.string().optional(),
  pan: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  contactNo: z
    .string()
    .min(10, "Contact No must be at least 10 characters long"),
  address: z.string().max(250, "Address must be at most 250 characters"),
  city: z.string().min(3, "City must be at least 3 character long"),
  state: z.string().min(2, "State must be at least 2 character long"),
  pincode: z.string().min(6, "Pincode must be at least 6 character long"),
  country: z.string().min(2, "Country must be at least 2 character long"),
  bankDetails: z.array(VendorBankDetailObject).optional(),

  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const VendorBankDetailSchema = VendorSchema.pick({ bankDetails: true });
export type Vendor = z.infer<typeof VendorSchema>;
export type VendorBankDetail = z.infer<typeof VendorBankDetailSchema>;
