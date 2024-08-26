import { SignInFormSchema } from "@/lib/zodschema/signin-schema";
import { z } from "zod";
import { SignUpFormSchema } from "@/lib/zodschema/signup-schema";

export type SignInFormType = z.infer<typeof SignInFormSchema>;
export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
