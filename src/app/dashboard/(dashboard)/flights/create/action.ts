"use server";

import prisma from "@/lib/prisma";
import { formFligtValidation } from "./validation";
import { generateSeatPerClass } from "@/lib/generate-seat";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const saveFligth = async (formData: FormData) => {
  const airplaneId = formData.get("airplaneId") as string;
  const price = formData.get("price") as string;
  const departureCity = formData.get("departureCity") as string;
  const departureDate = new Date(formData.get("departureDate") as string);
  const departureCityCode = formData.get("departureCityCode") as string;
  const destinationCity = formData.get("destinationCity") as string;
  const arrivalDate = new Date(formData.get("arrivalDate") as string);
  const destinationCityCode = formData.get("destinationCityCode") as string;

  const validations = formFligtValidation.safeParse({
    airplaneId,
    price,
    departureCity,
    departureDate,
    departureCityCode,
    destinationCity,
    arrivalDate,
    destinationCityCode,
  });

  console.log(validations?.error?.flatten().fieldErrors);

  if (!validations.success) {
    return {
      status: "error",
      message: "Silahkan periksa kembali form anda!",
      errors: validations.error.flatten().fieldErrors,
      data: {
        airplaneId,
        price,
        departureCity,
        departureDate,
        departureCityCode,
        destinationCity,
        arrivalDate,
        destinationCityCode,
      },
    };
  }

  const data = await prisma.flight.create({
    data: {
      airplaneId,
      departureCity,
      departureDate,
      departureCityCode,
      destinationCity,
      arrivalDate,
      destinatonCityCode: destinationCityCode,
      price: Number.parseInt(validations.data.price),
    },
  });

  const seats = generateSeatPerClass(data.id);

  await prisma.flightSeat.createMany({
    data: seats,
  });

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
};
