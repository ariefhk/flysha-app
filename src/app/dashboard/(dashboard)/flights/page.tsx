import { DataTable } from "@/app/_components/datatable";
import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Flights } from "@/services/flights.service";
import { flightColumns } from "./_components/flight-collumn";

export default async function DashboardFlightPage() {
  const flights = await Flights.getFlights();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="py-5 text-2xl font-bold">Flights</div>
        <Button asChild>
          <Link href="/dashboard/flights/create">
            <Plus className="flex-shrink-0 mr-2 h-4 w-4" />
            Add Data
          </Link>
        </Button>
      </div>
      <DataTable columns={flightColumns} data={flights} />
    </>
  );
}
