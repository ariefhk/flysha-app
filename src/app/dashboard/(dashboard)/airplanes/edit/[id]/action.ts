"use server";
import { uploadFile } from "@/lib/supabase";
import { editAirplaneFormValidation } from "./validation";
import { Airplanes } from "@/services/airplane.service";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editAirplaneAction = async (prevState: any, airplaneId: string, formData: FormData) => {
  const name = formData.get("name") as string;
  const code = formData.get("code") as string;
  const image = formData.get("image") as File;

  let editAirplaneValidation;

  if (image.size === 0) {
    editAirplaneValidation = editAirplaneFormValidation.omit({ image: true });
  } else {
    editAirplaneValidation = editAirplaneFormValidation;
  }

  const validation = editAirplaneValidation.safeParse({
    name,
    code,
    image,
  });

  if (!validation.success) {
    return {
      status: "error",
      message: "Silahkan periksa kembali form anda!",
      errors: validation.error.flatten().fieldErrors,
      data: {
        name: name,
        code: code,
      },
    };
  }

  let filename: string | null = null;

  if (image.size !== 0) {
    const uploadImage = await uploadFile(image);

    if (uploadImage instanceof Error) {
      return {
        status: "error",
        message: "Gagal mengupload gambar!",
        data: {
          name: name,
          code: code,
        },
      };
    }

    filename = uploadImage as string;
  }

  const exitedAirplane = await Airplanes.findById(airplaneId);

  if (!exitedAirplane) {
    return {
      status: "error",
      message: "Data tidak ditemukan!",
      data: {
        name: name,
        code: code,
      },
    };
  }

  try {
    const result = await prisma.airplane.update({
      where: {
        id: airplaneId,
      },
      data: {
        name: name,
        code: code,
        ...(filename && { image: filename }),
      },
    });
    console.log(result);
  } catch (error) {
    return {
      status: "error",
      message: "Gagal update data!",
      data: {
        name: name,
        code: code,
      },
    };
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
};
