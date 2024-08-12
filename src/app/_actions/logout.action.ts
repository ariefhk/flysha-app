"use server";

import { getUser, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutAction = async (_formData: FormData) => {
  const { session } = await getUser();

  if (!session) {
    redirect("dashboard/signin");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  redirect("dashboard/signin");
};
