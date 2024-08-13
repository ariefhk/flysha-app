import { Airplanes } from "@/services/airplane.service";
import React from "react";
import CreateFlightForm from "./form";

export default async function DashboardCreateFlight() {
  const airplanes = await Airplanes.findAllAirplanes();

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="py-5 text-2xl font-bold">Tambah Pesawat</div>
      </div>
      <CreateFlightForm airplanes={airplanes} />
    </div>
  );
}
