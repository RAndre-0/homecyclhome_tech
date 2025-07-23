"use client";

import InterventionCard from "@/components/InterventionCard";
import { Intervention } from "@/types/types";

type Props = {
  interventions: Intervention[];
};

export default function InterventionList({ interventions }: Props) {
  if (interventions.length === 0) {
    return <p className="text-muted-foreground text-sm">Aucune intervention prévue.</p>;
  }

  return (
    <div className="space-y-4">
      {interventions.map((intervention) => (
        <InterventionCard
          key={intervention.id}
          intervention={intervention}
          onClick={() => alert(`Détails de l'intervention #${intervention.id}`)}
        />
      ))}
    </div>
  );
}
