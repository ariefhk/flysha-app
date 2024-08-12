"use server";

import prisma from "@/lib/prisma";
import { deleteFile } from "@/lib/supabase";
import { Airplanes } from "@/services/airplane.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteAirplaneAction = async (prevState: any, airplaneId: string) => {
  const airplane = await Airplanes.findById(airplaneId);

  if (!airplane) {
    return {
      status: "error",
      message: "Gagal update data, data tidak ditemukan!",
    };
  }

  const filename = airplane.image;

  const deleteImage = await deleteFile(filename as string);

  if (!deleteImage) {
    return {
      status: "error",
      message: "Gagal menghapus gambar!",
    };
  }

  await prisma.airplane.delete({
    where: {
      id: airplaneId,
    },
  });

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
};
