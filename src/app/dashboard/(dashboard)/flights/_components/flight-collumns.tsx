"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Airplane, Flight, FlightSeat } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { getUploadFile } from "@/lib/supabase";
import FlightRouteColumn from "./flight-route-column";
import SeatPriceCell from "./fligt-route-cell";

export type FlightColumn = Flight & {
  airplane: Airplane;
  flightSeats: FlightSeat[];
};

export const flightColumns: ColumnDef<FlightColumn>[] = [
  {
    accessorKey: "airplaneId",
    header: "Pesawat",
    cell: ({ row }) => {
      const flight = row.original;

      const planeImageUrl = getUploadFile(flight.airplane.image as string);

      return (
        <div className="inline-flex items-center gap-5">
          <Image src={planeImageUrl} alt="Image Plane" width={120} height={120} className="rounded-xl" />
          <div className="font-bold">{flight.airplane.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "departureCity",
    header: "Rute",
    cell: ({ row }) => {
      const flight = row.original;

      return <FlightRouteColumn flight={flight} />;
    },
  },
  {
    accessorKey: "price",
    header: "Harga / Kursi",
    cell: ({ row }) => {
      const flight = row.original;

      return <SeatPriceCell flight={flight} />;
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const flight = row.original;

      return (
        <div className="inline-flex gap-5 items-center">
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/dashboard/flights/edit/${flight.id}`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          {/* <DeleteAirplane id={plane.id} /> */}
          {/* <DeleteFlight id={flight.id} /> */}
        </div>
      );
    },
  },
];
