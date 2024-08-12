"use client";

import { Button } from "@/app/_components/ui/button";
import { LoaderCircle, LogOut } from "lucide-react";
import { logoutAction } from "@/app/_actions/logout.action";
import { useFormStatus } from "react-dom";

export default function DashboardLogout() {
  return (
    <form action={logoutAction}>
      <LogoutButton />
    </form>
  );
}

function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={"destructive"} className="w-full justify-start" disabled={pending}>
      {pending ? (
        <LoaderCircle className="animate-spin w-4 h-4 flex-shrink-0 mr-2" />
      ) : (
        <LogOut className="mr-2 w-4 h-4 flex-shrink-0" />
      )}
      Logout
    </Button>
  );
}
