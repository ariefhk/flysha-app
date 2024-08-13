import { FlightSeat } from "@prisma/client";

export const mappingSeats = (seats: FlightSeat[]) => {
  const totalSeatEconomy = seats.filter((item) => item.seatType === "ECONOMY").length;
  const totalSeatBusiness = seats.filter((item) => item.seatType === "BUSINESS").length;
  const totalSeatFirst = seats.filter((item) => item.seatType === "FIRST").length;

  const economy = seats.filter((item) => item.seatType === "ECONOMY" && item.isBooked).length;
  const business = seats.filter((item) => item.seatType === "BUSINESS" && item.isBooked).length;
  const first = seats.filter((item) => item.seatType === "FIRST" && item.isBooked).length;

  return {
    economy,
    business,
    first,
    totalSeatEconomy,
    totalSeatBusiness,
    totalSeatFirst,
  };
};
