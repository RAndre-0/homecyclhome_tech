'use client';

import { useEffect, useState } from "react";
import DaySelector from "@/components/DaySelector";
import InterventionList from "@/components/InterventionList";
import { Intervention } from "@/types/types";
import { apiService } from "@/services/api-service";
import { format, parseISO, isBefore, isAfter } from "date-fns";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(() => format(new Date(), "yyyy-MM-dd"));
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterventions = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await apiService(`interventions/technicien?date=${selectedDate}`, "GET");

        const now = new Date();

        const enriched: Intervention[] = data
          .filter((i: Intervention) => i.client !== null)
          .map((i: Intervention) => {
            const debut = parseISO(i.debut);
            const fin = i.fin ? parseISO(i.fin) : null;

            let status: "past" | "current" | "upcoming" = "upcoming";
            if (fin && isBefore(fin, now)) status = "past";
            else if (isBefore(debut, now) && (!fin || isAfter(fin, now))) status = "current";

            return {
              ...i,
              status,
              time: `${debut.getHours().toString().padStart(2, "0")}:${debut.getMinutes().toString().padStart(2, "0")}` +
                (fin ? ` - ${fin.getHours().toString().padStart(2, "0")}:${fin.getMinutes().toString().padStart(2, "0")}` : ""),
              name: `${i.client?.firstName ?? ""} ${i.client?.lastName ?? ""}`.trim(),
              type: i.typeIntervention?.nom ?? "Inconnu",
              address: i.adresse ?? ""
            };
          });

        setInterventions(enriched);
      } catch {
        setError("Impossible de charger les interventions.");
        setInterventions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInterventions();
  }, [selectedDate]);

  return (
    <>
      <div className="-mt-4 -mx-4 lg:-mt-6 lg:-mx-6">
        <DaySelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </div>
      <div className="space-y-4">
        {loading && <p className="text-sm text-muted-foreground">Chargement...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {!loading && !error && <InterventionList interventions={interventions} />}
      </div>
    </>
  );

}
