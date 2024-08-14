"use server";

import { getUser, lucia } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutAction = async (_formData: FormData) => {
  const { session } = await getUser();

  if (!session) {
    return redirect("dashboard/signin");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("dashboard/signin");
};

export const logoutUserAction = async (_formData: FormData) => {
  const { session } = await getUser();

  if (!session) {
    return redirect("/");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  revalidatePath("/");
  return redirect("/");
};
