import React, { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div>{children}</div>;
}
