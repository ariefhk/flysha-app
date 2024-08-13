"use client";
import { Button } from "@/app/_components/ui/button";
import { LoaderCircle } from "lucide-react";
import React, { useTransition } from "react";

import { deleteFlight } from "../_actions/delete-flights.action";
import { useToast } from "@/app/_components/ui/use-toast";

interface DeleteFlightButtonProps {
  id: string;
}

export default function DeleteFlightButton({ id }: Readonly<DeleteFlightButtonProps>) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  async function handleDeleteFlight(id: string) {
    startTransition(async () => {
      try {
        await deleteFlight(id);
        toast({
          title: "Berhasil menghapus pesawat!",
          description: "Selamat, Anda berhasil menghapus pesawat!",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Terdapat Kesalahan",
          description: "Anda gagal Menghapus pesawat!.",
        });
      }
    });
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleDeleteFlight(id);
      }}
    >
      <DeleteButton isPending={isPending} />
    </form>
  );
}

const DeleteButton = ({ isPending }: { isPending: boolean }) => {
  return (
    <Button variant={"destructive"} size={"sm"} className="w-full" type="submit" disabled={isPending}>
      {isPending && <LoaderCircle className="animate-spin w-4 h-4 flex-shrink-0 mr-1" />} Delete
    </Button>
  );
};
