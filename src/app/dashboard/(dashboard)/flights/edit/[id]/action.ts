"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formFligtValidation } from "../../create/validation";

export async function updateFlight(prevState: unknown, id: string | null, formData: FormData) {
  if (!id) {
    return {
      status: "error",
      message: "Flight Id wajib diisi!",
    };
  }

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

  await prisma.flight.update({
    where: { id: id },
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

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}
