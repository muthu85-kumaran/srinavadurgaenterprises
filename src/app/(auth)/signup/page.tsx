import React, { Suspense } from "react";
import SignUpForm from "./signupform";

const SignUpPage = () => {
  return (
    <div className="grid  md:place-items-center  min-h-screen">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
