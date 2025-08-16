"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";

type Props = {
  selectedDate: string; // ex: "2025-07-22"
  onDateChange: (date: string) => void;
};

export default function DaySelector({ selectedDate, onDateChange }: Props) {
  const days = Array.from({ length: 5 }, (_, i) => addDays(new Date(), i));

  const formatDateKey = (date: Date) => format(date, "yyyy-MM-dd");

  const getLabel = (date: Date, index: number) => {
    if (index === 0) return "Ajd";
    if (index === 1) return "Demain";
    return format(date, "EEE d", { locale: fr });
  };

  return (
    <div className="bg-primary px-4 py-2">
      <Tabs value={selectedDate} onValueChange={(v) => onDateChange(v)}>
        <TabsList className="grid grid-cols-5 gap-2 w-full bg-transparent p-0">
          {days.map((day, i) => {
            const dateKey = formatDateKey(day);
            return (
              <TabsTrigger
                key={i}
                value={dateKey}
                className="text-white data-[state=active]:bg-lime-700 data-[state=active]:text-white"
              >
                {getLabel(day, i)}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
}
