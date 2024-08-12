import React from "react";
import EditAirplaneForm from "./form";
import { Airplanes } from "@/services/airplane.service";

interface DashboardEditAirplanesPageProps {
  params: {
    id: string;
  };
}

export default async function DashboardEditAirplanesPage({ params: { id } }: Readonly<DashboardEditAirplanesPageProps>) {
  const airplane = await Airplanes.findById(id);

  if (!airplane) {
    return <div>Data tidak ditemukan!</div>;
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="py-5 text-2xl font-bold">Edit Pesawat</div>
      </div>
      <EditAirplaneForm {...airplane} />
    </div>
  );
}
