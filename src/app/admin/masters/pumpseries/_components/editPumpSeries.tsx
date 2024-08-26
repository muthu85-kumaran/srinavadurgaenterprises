"use client";
import PumpSeriesForm from "./pumpSeriesForm";
import { getPumpSeriesAction } from "@/actions/masters/PumpSeriesAction";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PumpSeries } from "@/types/pumpSeries";
const EditPumpSeries = () => {
  const [pumpseries, setPumpseries] = useState<PumpSeries | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const pumpseries = getPumpSeriesAction(id as string).then((data) => {
      setPumpseries(data as unknown as PumpSeries);
    });
  }, []);

  return (
    <div className="w-1/3 m-4">
      {pumpseries && <PumpSeriesForm pumpSeries={pumpseries} />}
    </div>
  );
};

export default EditPumpSeries;
