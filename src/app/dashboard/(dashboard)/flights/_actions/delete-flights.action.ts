"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteFlight(id: string) {
  try {
    await prisma.flightSeat.deleteMany({ where: { flightId: id } });
    await prisma.flight.delete({ where: { id: id } });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/flights");
}
