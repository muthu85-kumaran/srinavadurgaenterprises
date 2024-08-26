import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    email: z.string({ required_error: "E-mail must be required" }).email(),
    contactNo: z
      .string({ required_error: "Contact Number must be required" })
      .min(10, "Contact Number must be atleast 10 digits")
      .max(10, "Contact Number must be almost 10 digits"),
    password: z
      .string({ required_error: "Enter the password" })
      .min(3, "The Password should be atleast 3 characters")
      .max(20, "The Password should not above 20 characters"),
    confirmpassword: z.string({ required_error: "Conform the Password" }),
    firstName: z
      .string({ required_error: "First Name should not be empty" })
      .min(3, "First Name should be minimum 3 characters long")
      .max(40, "First Name should be Maximum 40 characters long"),

    lastName: z.string().optional(),
  })
  .refine((data) => data.password !== data.confirmpassword, {
    message: "Password & Conform Password does'nt Match ",
    path: ["conformpassword"],
  });

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
