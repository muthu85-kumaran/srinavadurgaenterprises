"use client";
import PumpTypeAppForm from "./PumpTypeAppForm";
import { getPumpTypeAppAction } from "@/actions/masters/PumpTypeAppAction";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PumpTypeApp } from "@/types/pumpTypeApp";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
const EditPumpTypeApp = () => {
  const [pumptypeApp, setPumpTypeApp] = useState<PumpTypeApp | null>(null);
  const { id } = useParams();
  useEffect(() => {
    getPumpTypeAppAction(id as string).then((data) => {
      setPumpTypeApp(data as unknown as PumpTypeApp);
    });
  }, []);

  return (
    <>
      <Breadcrumbs />

      <div className="w-1/3 m-4">
        {pumptypeApp && <PumpTypeAppForm pumpTypeApp={pumptypeApp} />}
      </div>
    </>
  );
};

export default EditPumpTypeApp;
