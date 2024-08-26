"use client";
import VoltageForm from "./VoltageForm";
import { getVoltageAction } from "@/actions/masters/VoltageAction";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import { Voltage } from "@/types/Voltage";

const EditVoltage = () => {
  const [Voltage, setVoltage] = useState<Voltage | null>(null);
  const { id } = useParams();
  useEffect(() => {
    getVoltageAction(id as string).then((data) => {
      setVoltage(data as unknown as Voltage);
    });
  }, []);

  return (
    <>
      <Breadcrumbs />

      <div className="w-1/3 m-4">
        {Voltage && <VoltageForm Voltage={Voltage} />}
      </div>
    </>
  );
};

export default EditVoltage;
