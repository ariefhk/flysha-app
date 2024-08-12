"use server";
import { lucia } from "@/lib/auth";
import { compareBcrypt } from "@/lib/bcrypt";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string({ required_error: "Email wajib diisi!" }).email({ message: "Email tidak valid!" }),
  password: z.string({ required_error: "Password wajib diisi!" }).min(2, { message: "Password minimal 8 karakter!" }),
});

export const signInAction = async (prevState: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const loginValidation = loginSchema.safeParse({ email, password });

  if (!loginValidation.success) {
    return {
      status: "error",
      message: "Silahkan periksa kembali form anda!",
      errors: loginValidation.error.flatten().fieldErrors,
      data: {
        email,
        password,
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return {
      status: "error",
      message: "Email tidak ditemukan!",
      data: {
        email,
        password,
      },
    };
  }

  const isValidPassword = await compareBcrypt(password, existingUser.password);

  if (!isValidPassword) {
    return {
      status: "error",
      message: "Password salah!",
      data: {
        email,
        password,
      },
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/dashboard");
};
