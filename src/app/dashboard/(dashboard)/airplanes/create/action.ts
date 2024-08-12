"use server";

import { uploadFile } from "@/lib/supabase";
import { createAirplaneFormValidation } from "./validation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createAirplaneAction = async (prevState: any, formData: FormData) => {
  const name = formData.get("name") as string;
  const code = formData.get("code") as string;
  const image = formData.get("image") as File;

  const createAirplaneValidation = createAirplaneFormValidation.safeParse({
    name,
    code,
    image,
  });

  if (!createAirplaneValidation.success) {
    return {
      status: "error",
      message: "Silahkan periksa kembali form anda!",
      errors: createAirplaneValidation.error.flatten().fieldErrors,
      data: {
        name: name,
        code: code,
      },
    };
  }

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

  try {
    const result = await prisma.airplane.create({
      data: {
        name: name,
        code: code,
        image: uploadImage as string,
      },
    });

    console.log(result);
  } catch (error) {
    return {
      status: "error",
      message: "Gagal insert data!",
      data: {
        name: name,
        code: code,
      },
    };
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
};
