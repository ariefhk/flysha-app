import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Airplanes } from "@/services/airplane.service";

export default async function DashboardAirplanePage() {
  const airplanes = await Airplanes.findAllAirplanes();

  console.log(airplanes);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="py-5 text-2xl font-bold">Airplanes</div>
      <Button asChild>
        <Link href="/dashboard/airplanes/create">
          <Plus className="flex-shrink-0 mr-2 h-4 w-4" />
          Add Data
        </Link>
      </Button>
    </div>
  );
}
