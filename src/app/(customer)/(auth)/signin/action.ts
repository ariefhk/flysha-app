"use server";

import { compareBcrypt } from "@/lib/bcrypt";
import { userLoginSchema } from "./validation";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function signInUser(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validate = userLoginSchema.safeParse({
    email,
    password,
  });

  if (!validate.success) {
    return {
      status: "error",
      message: "Silahkan periksa kembali form anda!",
      errors: validate.error.flatten().fieldErrors,
      data: {
        email,
        password,
      },
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
    },
  });

  if (!existingUser) {
    return {
      status: "error",
      message: "Akun tidak ditemukan!",
      data: {
        email,
        password,
      },
    };
  }

  const validPassword = await compareBcrypt(validate.data.password, existingUser.password);

  if (!validPassword) {
    return {
      status: "error",
      message: "Email atau password tidak valid!",
      data: {
        email,
        password,
      },
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/");
}
