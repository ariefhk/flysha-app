import React, { useMemo, type FC } from "react";

import { rupiahFormat } from "@/lib/rupiah";
import { mappingSeats } from "@/lib/mapping-seat";
import { FlightColumn } from "./flight-collumns";

interface SeatPriceCellProps {
  flight: FlightColumn;
}

const SeatPriceCell: FC<SeatPriceCellProps> = ({ flight }) => {
  const {
    economy,
    business,
    first,

    totalSeatEconomy,
    totalSeatBusiness,
    totalSeatFirst,
  } = useMemo(() => mappingSeats(flight.flightSeats), [flight]);

  console.log(rupiahFormat(flight.price + 500000));

  return (
    <div className="space-y-2">
      <div className="space-y-0.5">
        <div className="font-bold">
          <span className="text-primary text-sm">Ekonomy:</span>
        </div>
        <div className="font-medium">
          <span className="text-primary">Harga tiket:</span> {rupiahFormat(flight.price)}
        </div>
        <div className="font-medium">
          <span className="text-primary">Sisa kursi:</span> {economy}/{totalSeatEconomy}
        </div>
      </div>
      <div className="space-y-0.5">
        <div className="font-bold">
          <span className="text-primary">Bisnis:</span>
        </div>
        <div className="font-medium">
          <span className="text-primary">Harga tiket:</span> {rupiahFormat(flight.price + 500000)}
        </div>
        <div className="font-medium">
          <span className="text-primary">Sisa kursi:</span> {business}/{totalSeatBusiness}
        </div>
      </div>
      <div className="space-y-0.5">
        <div className="font-bold">
          <span className="text-primary">First:</span>
        </div>
        <div className="font-medium">
          <span className="text-primary">Harga tiket:</span> {rupiahFormat(flight.price + 750000)}
        </div>
        <div className="font-medium">
          <span className="text-primary">Sisa kursi:</span> {first}/{totalSeatFirst}
        </div>
      </div>
    </div>
  );
};

export default SeatPriceCell;
