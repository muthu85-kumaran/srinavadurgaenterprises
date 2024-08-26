import NextAuth from "next-auth";
import db from "./db/database";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        // token.id = user.id
        token.role = user.role;
        token.name = user.lastName
          ? user.firstName + " " + user.lastName
          : user.firstName;
      }
      return token;
    },
    session({ session, token, user }) {
      if (session.user) {
        session.user.role = token.role;
      }
      // session.user.id = token.id
      return session;
    },
  },
});
