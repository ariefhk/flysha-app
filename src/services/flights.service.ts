import prisma from "@/lib/prisma";

export const Flights = {
  async getFlights() {
    try {
      const flights = await prisma.flight.findMany({
        include: {
          airplane: true,
          flightSeats: true,
        },
      });
      return flights;
    } catch (error) {
      console.error("Database Error: ", error);
      return [];
    }
  },

  async getFlightById(id: string) {
    try {
      const flight = await prisma.flight.findUnique({
        where: {
          id,
        },
        include: {
          airplane: true,
          flightSeats: true,
        },
      });
      return flight;
    } catch (error) {
      console.error("Database Error: ", error);
      return null;
    }
  },
};
