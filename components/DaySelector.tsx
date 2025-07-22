"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DaySelector() {
  return (
    <div className="bg-primary px-4 py-2">
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid grid-cols-5 gap-2 w-full bg-transparent p-0">
          <TabsTrigger
            value="today"
            className="text-white data-[state=active]:bg-lime-700 data-[state=active]:text-white"
          >
            Ajd
          </TabsTrigger>
          <TabsTrigger
            value="tomorrow"
            className="text-white data-[state=active]:bg-lime-700 data-[state=active]:text-white"
          >
            Demain
          </TabsTrigger>
          <TabsTrigger
            value="wed"
            className="text-white data-[state=active]:bg-lime-700 data-[state=active]:text-white"
          >
            Mer 12
          </TabsTrigger>
          <TabsTrigger
            value="thu"
            className="text-white data-[state=active]:bg-lime-700 data-[state=active]:text-white"
          >
            Jeu 13
          </TabsTrigger>
          <TabsTrigger
            value="fri"
            className="text-white data-[state=active]:bg-lime-700 data-[state=active]:text-white"
          >
            Ven 14
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
