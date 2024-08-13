import prisma from "@/lib/prisma";

export const Ticket = {
  async getAllTickets() {
    try {
      const tickets = await prisma.ticket.findMany({
        include: {
          customer: true,
          flight: true,
          seat: true,
        },
      });

      return tickets;
    } catch (error) {
      console.error("Error fetching tickets", error);

      return [];
    }
  },
};
