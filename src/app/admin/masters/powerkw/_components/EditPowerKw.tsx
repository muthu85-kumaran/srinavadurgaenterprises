"use client";
import PowerKwForm from "./PowerKwForm";
import { getPowerKwAction } from "@/actions/masters/PowerInKwAction";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import { PowerKw } from "@/types/powerKw";

const EditPowerKw = () => {
  const [PowerKw, setPowerKw] = useState<PowerKw | null>(null);
  const { id } = useParams();
  useEffect(() => {
    getPowerKwAction(id as string).then((data) => {
      setPowerKw(data as unknown as PowerKw);
    });
  }, []);

  return (
    <>
      <Breadcrumbs />

      <div className="w-1/3 m-4">
        {PowerKw && <PowerKwForm PowerKw={PowerKw} />}
      </div>
    </>
  );
};

export default EditPowerKw;
