"use client";
import AppHeader from "@/components/AppHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <AppHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </>
    )
  }