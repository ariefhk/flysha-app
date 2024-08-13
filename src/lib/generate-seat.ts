import { SeatType } from "@prisma/client";

export const generateSeatPerClass = (flightId: string) => {
  const SEAT_CLASS: SeatType[] = ["ECONOMY", "BUSINESS", "FIRST"];
  const SEAT_CODE = ["A", "B", "C", "D"];

  const seats: { seatNumber: string; seatType: SeatType; flightId: string }[] = [];

  for (const className of SEAT_CLASS) {
    for (const seat of SEAT_CODE) {
      for (let i = 1; i <= 5; i++) {
        seats.push({
          seatNumber: seat + i,
          seatType: className,
          flightId,
        });
      }
    }
  }

  return seats;
};
