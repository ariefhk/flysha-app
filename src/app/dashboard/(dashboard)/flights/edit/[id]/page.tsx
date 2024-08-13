import React from "react";
import { Flights } from "@/services/flights.service";
import { Airplanes } from "@/services/airplane.service";
import EditFlightForm from "./form";

interface DashboardEditAirplanesPageProps {
  params: {
    id: string;
  };
}

export default async function DashboardEditFlightPage({ params: { id } }: Readonly<DashboardEditAirplanesPageProps>) {
  const flight = await Flights.getFlightById(id);
  const airplanes = await Airplanes.findAllAirplanes();

  if (!flight) {
    return <div>Data tidak ditemukan!</div>;
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="py-5 text-2xl font-bold">Edit Pesawat</div>
      </div>
      <EditFlightForm defaultValues={flight} airplanes={airplanes} />
      {/* <EditAirplaneForm {...airplane} /> */}
    </div>
  );
}
