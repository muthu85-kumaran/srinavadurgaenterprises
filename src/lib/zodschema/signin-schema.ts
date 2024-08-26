import { z } from "zod";
export const SignInFormSchema = z.object({
  email: z
    .string({ required_error: "The E-mail must be required" })
    .email("enter a valid email"),
  password: z
    .string({ required_error: "Enter the password" })
    .min(1, "Password is required")
    .min(3, "The Password should be atleast 3 characters")
    .max(20, "The Password should not above 20 characters"),
});
