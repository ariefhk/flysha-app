import React from "react";
import { Ticket } from "@/services/ticket.service";
import { DataTable } from "@/app/_components/datatable";
import { ticketColumns } from "./_components/tickets-columns";

export default async function DashboardTicketsPage() {
  const tickets = await Ticket.getAllTickets();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="py-5 text-2xl font-bold">Tickets</div>
      </div>
      <DataTable columns={ticketColumns} data={tickets} />
    </>
  );
}
