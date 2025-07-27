"use client";

import InterventionCard from "@/components/InterventionCard";
import { Intervention } from "@/types/types";
import { useRouter } from "next/navigation";

type Props = {
  interventions: Intervention[];
};

export default function InterventionList({ interventions }: Props) {
  const router = useRouter();

  if (interventions.length === 0) {
    return <p className="text-muted-foreground text-sm">Aucune intervention prévue.</p>;
  }

  return (
    <div className="space-y-4">
      {interventions.map((intervention) => (
        <InterventionCard
          key={intervention.id}
          intervention={intervention}
          onClick={() => router.push(`/interventions/${intervention.id}`)}
        />
      ))}
    </div>
  );
}
