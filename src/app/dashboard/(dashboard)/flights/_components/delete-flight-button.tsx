"use client";
import { Button } from "@/app/_components/ui/button";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

import { deleteFlight } from "../_actions/delete-flights.action";

interface DeleteFlightButtonProps {
  id: string;
}

export default function DeleteFlightButton({ id }: Readonly<DeleteFlightButtonProps>) {
  const handleDeleteAirplane = async (_state: any, _formData: FormData) => {
    return deleteFlight(id);
  };

  const [_state, formAction] = useFormState(handleDeleteAirplane, null);

  return (
    <form action={formAction}>
      <DeleteButton />
    </form>
  );
}

const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant={"destructive"} size={"sm"} className="w-full" type="submit" disabled={pending}>
      {pending && <LoaderCircle className="animate-spin w-4 h-4 flex-shrink-0 mr-1" />} Delete
    </Button>
  );
};
