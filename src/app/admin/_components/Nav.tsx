import React, { ReactNode } from "react";

export const Nav = async ({ children }: { children: ReactNode }) => {
  return (
    <nav className="md:bg-primary md:text-primary-foreground flex flex-col justify-start  min-h-screen max-h-max  w-full">
      {children}
    </nav>
  );
};
