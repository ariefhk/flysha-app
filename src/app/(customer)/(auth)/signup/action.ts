"use server";

import { createBcrypt } from "@/lib/bcrypt";
import { userSchema } from "./validation";

import prisma from "@/lib/prisma";

export const signUpUserAction = async (_prevState: any, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passport = formData.get("passport") as string;

  const validations = userSchema.safeParse({
    name,
    email,
    password,
    passport,
  });

  if (!validations.success) {
    return {
      status: "error",
      message: "Silahkan periksa kembali form anda!",
      errors: validations.error.flatten().fieldErrors,
      data: {
        name,
        email,
        password,
        passport,
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      status: "error",
      message: "Email sudah digunakan, silahkan gunakan email yg lain!",
      data: {
        name,
        email,
        password,
        passport,
      },
    };
  }

  const hashedPassword = await createBcrypt(password);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      passport,
    },
  });

  return {
    status: "success",
    message: "Pendaftaran berhasil",
    data: {
      name,
      email,
    },
  };
};
