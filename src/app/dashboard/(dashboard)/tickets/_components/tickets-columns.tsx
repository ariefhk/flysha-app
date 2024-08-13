"use client";

import type { Flight, FlightSeat, Ticket, User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/lib/cn";
import FlightRouteColumn from "../../flights/_components/flight-route-column";

type TicketType = Ticket & {
  flight: Flight;
  customer: User;
  seat: FlightSeat;
};

export const ticketColumns: ColumnDef<TicketType>[] = [
  {
    accessorKey: "customerId",
    header: "Nama Penumpang",
    cell: ({ row }) => {
      const ticket = row.original;

      return ticket.customer.name;
    },
  },
  {
    accessorKey: "flightId",
    header: "Detail Penerbangan",
    cell: ({ row }) => {
      const ticket = row.original;

      return <FlightRouteColumn flight={ticket.flight} />;
    },
  },
  {
    accessorKey: "seatId",
    header: "Nomor Kursi",
    cell: ({ row }) => {
      const ticket = row.original;

      return <Badge>{ticket.seat.seatNumber}</Badge>;
    },
  },
  {
    id: "status_transaction",
    header: "Status transaksi",
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <div className="space-y-1">
          <Badge
            className={cn(
              ticket.status === "SUCCESS" ? "bg-green-500" : ticket.status === "PENDING" ? "bg-yellow-500" : "bg-red-500"
            )}
          >
            {ticket.status}
          </Badge>
        </div>
      );
    },
  },
];
