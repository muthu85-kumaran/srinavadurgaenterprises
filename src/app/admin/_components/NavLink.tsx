"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export const NavLink = (
  props: Omit<ComponentProps<typeof Link>, "className"> // Use the LinkProps type in the props type annotation
) => {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        "p-1 hover:bg-orange-400 md:hover:bg-secondary md:hover:text-orange-800 hover:text-gray-500 focus-visible:bg-orange-200 focus-visible:text-secondary-foreground justify-start items-start   text-sm font-normal transition-colors duration-75 ease-in-out flex flex-col w-full ",

        props.href === pathname &&
          "bg-background text-foreground border-r-2 border-red-500 dialog_box right"
      )}
    />
  );
};
