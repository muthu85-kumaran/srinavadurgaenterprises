import React, { Suspense } from "react";
import SignInForm from "./signinform";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
const SignInPage = async () => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="grid  md:place-items-center  min-h-screen">
        <SignInForm />
      </div>
    </SessionProvider>
  );
};

export default SignInPage;
