"use client";
import SuctionForm from "./SuctionForm";
import { getSuctionAction } from "@/actions/masters/SuctionAction";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import { Suction } from "@/types/Suction";

const EditSuction = ({ data }: { data: Suction | unknown }) => {
  return (
    <>
      <Breadcrumbs />
      <div className="w-1/3 m-4">
        {typeof data !== "undefined" && (
          <SuctionForm Suction={data as Suction} />
        )}
      </div>
    </>
  );
};

export default EditSuction;
