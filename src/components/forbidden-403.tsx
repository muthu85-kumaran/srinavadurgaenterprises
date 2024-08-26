import React from "react";
import "@/app/forbidden.css";
import Link from "next/link";

const ForbiddenPage = () => {
  return (
    <Link href="/">
      <div className="base bg-gray-300 p-2 ">
        <h1>403</h1>
        <h2>Access Forbidden</h2>
        <h5>i'm sorry buddy</h5>
      </div>
    </Link>
  );
};

export default ForbiddenPage;
