import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DashboardFlightPage() {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="py-5 text-2xl font-bold">Flights</div>
      <Button asChild>
        <Link href="/dashboard/flights/create">
          <Plus className="flex-shrink-0 mr-2 h-4 w-4" />
          Add Data
        </Link>
      </Button>
    </div>
  );
}
