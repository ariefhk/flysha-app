import React from "react";
import CreateAirplaneForm from "./form";

export default function DashboardCreateAirplanesPage() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="py-5 text-2xl font-bold">Tambah Pesawat</div>
      </div>
      <CreateAirplaneForm />
    </div>
  );
}
