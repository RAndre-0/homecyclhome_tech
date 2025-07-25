"use client";

import AppHeader from "@/components/AppHeader";
import DaySelector from "@/components/DaySelector";
import { useState } from "react";
import { format } from "date-fns";

export default function InterventionsLayout({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState(() => format(new Date(), "yyyy-MM-dd"));

  return (
    <>
      <AppHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        {children}
      </main>
    </>
  );
}
