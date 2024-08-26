"use client";
import PhaseForm from "../_components/phaseForm";
import { getPhaseAction } from "@/actions/masters/PhaseAddAction";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Phase } from "@/types/phase";
const EditPhase = () => {
  const [phase, setPhase] = useState<Phase | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const phase = getPhaseAction(id as string).then((data) => {
      setPhase(data as unknown as Phase);
    });
  }, []);

  return (
    <div className="w-1/3 m-4">{phase && <PhaseForm phase={phase} />}</div>
  );
};

export default EditPhase;
