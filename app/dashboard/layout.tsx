"use client";
import AppHeader from "@/components/AppHeader";
import DaySelector from "@/components/DaySelector";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <AppHeader />
        <DaySelector />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </>
    )
  }