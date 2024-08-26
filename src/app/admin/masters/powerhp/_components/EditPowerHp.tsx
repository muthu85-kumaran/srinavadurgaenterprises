"use client";
import PowerHpForm from "./PowerHpForm";
import { getPowerHpAction } from "@/actions/masters/PowerInHpAction";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import { PowerHp } from "@/types/powerHp";

const EditPowerHp = () => {
  const [PowerHp, setPowerHp] = useState<PowerHp | null>(null);
  const { id } = useParams();
  useEffect(() => {
    getPowerHpAction(id as string).then((data) => {
      setPowerHp(data as unknown as PowerHp);
    });
  }, []);

  return (
    <>
      <Breadcrumbs />

      <div className="w-1/3 m-4">
        {PowerHp && <PowerHpForm PowerHp={PowerHp} />}
      </div>
    </>
  );
};

export default EditPowerHp;
