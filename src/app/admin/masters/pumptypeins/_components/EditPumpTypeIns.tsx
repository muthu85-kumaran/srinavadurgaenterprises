"use client";
import PumpTypeInsForm from "./PumpTypeInsForm";
import { getPumpTypeInsAction } from "@/actions/masters/PumpTypeInsAction";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PumpTypeIns } from "@/types/pumpTypeIns";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
const EditPumpTypeIns = () => {
  const [PumpTypeIns, setPumpTypeIns] = useState<PumpTypeIns | null>(null);
  const { id } = useParams();
  useEffect(() => {
    getPumpTypeInsAction(id as string).then((data) => {
      setPumpTypeIns(data as unknown as PumpTypeIns);
    });
  }, []);

  return (
    <>
      <Breadcrumbs />

      <div className="w-1/3 m-4">
        {PumpTypeIns && <PumpTypeInsForm PumpTypeIns={PumpTypeIns} />}
      </div>
    </>
  );
};

export default EditPumpTypeIns;
