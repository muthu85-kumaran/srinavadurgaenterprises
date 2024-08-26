import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    email: z.string({ required_error: "The E-mail must be required" }).email(),
    password: z
      .string({ required_error: "Enter the password" })
      .min(3, "The Password should be atleast 3 characters")
      .max(20, "The Password should not above 20 characters"),
    conformpassword: z.string({ required_error: "Conform the Password" }),
    name: z
      .string({ required_error: "Name is required" })
      .min(3, "Name should be minimum 3 characters")
      .max(40, "Name should be maximum 40 characters"),
  })
  .refine((data) => data.password === data.conformpassword, {
    message: "Password & Conform Password does'nt Match ",
    path: ["conformpassword"],
  });
