"use client";
import React from "react";
import { useCompanyInfo } from "@/hooks/companyinfo";

const CompanyInfo = () => {
  const { companyInfo } = useCompanyInfo();
  return (
    <div className="flex flex-col text-sm gap-1 justify-center items-start">
      <p className="text-md font-semibold">{companyInfo.name}</p>
      <p className="">{companyInfo.address}</p>
      <div className="flex flex-col md:flex-row gap-4">
        <p>
          <span className="font-semibold pr-2"> GSTIN:</span>
          {companyInfo.gstin}
        </p>
        <p>
          <span className="font-semibold pr-2"> PAN:</span>
          {companyInfo.pan}
        </p>
      </div>
      <div className="flex flex-col md:flex-row  gap-4">
        <p>
          <span className="font-semibold pr-2"> E-mail:</span>
          {companyInfo.email}
        </p>
        <p>
          <span className="font-semibold pr-2"> Contact Number:</span>
          {companyInfo.phone}
        </p>
      </div>
      <p>
        <span className="font-semibold pr-2"> website:</span>
        {companyInfo.website}
      </p>
    </div>
  );
};

export default CompanyInfo;
