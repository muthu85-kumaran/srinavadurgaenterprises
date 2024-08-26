"use client";
import React, { Fragment, ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Breadcrumbs = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div className="my-1 bg-slate-200 px-4 py-2 shadow-md w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {pathNames.length > 0 && <BreadcrumbSeparator />}
          {pathNames.map((link, index) => {
            let href = `/${pathNames.slice(0, index + 1).join("/")}`;
            let linkName = link[0].toUpperCase() + link.slice(1, link.length); // first letter upper
            let isLastPath = pathNames.length === index + 1;
            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  {isLastPath ? (
                    <BreadcrumbPage>{linkName}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>{linkName}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLastPath && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
