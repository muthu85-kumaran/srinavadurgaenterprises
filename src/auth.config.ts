import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { SignInFormSchema } from "@/lib/zodschema/signin-schema";
import db from "./db/database";
import bcrypt from "bcryptjs";
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    credentials({
      authorize: async (credentials, request) => {
        const { data, success } = SignInFormSchema.safeParse(credentials);
        if (!success) {
          throw new Error("Invalid Credentials");
        }
        const user = await db.user.findUnique({
          where: {
            email: data.email,
          },
        });
        if (!user) {
          throw new Error("User not Found");
        }
        const isValid = await bcrypt.compare(data.password, user.password!!);
        if (!isValid) {
          throw new Error("Invalid Password");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
