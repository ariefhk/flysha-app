"use client";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Airplane } from "@prisma/client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/app/_components/ui/button";
import { LoaderCircle } from "lucide-react";
import { editAirplaneAction } from "./action";

export default function EditAirplaneForm(props: Readonly<Airplane>) {
  const handleEditAirplane = async (state: any, formData: FormData) => {
    return editAirplaneAction(null, props.id, formData);
  };

  const [state, formAction] = useFormState(handleEditAirplane, null);

  return (
    <form action={formAction} className="max-w-md  space-y-4">
      <div className="grid gap-1.5">
        <Label htmlFor="code">Kode Pesawat</Label>
        <Input placeholder="Kode Pesawat..." name="code" id="code" defaultValue={props?.code} />
        {state?.status === "error" && state.errors?.code ? (
          <div className="text-rose-700 text-sm">{state.errors.code}</div>
        ) : null}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Nama Pesawat</Label>
        <Input placeholder="Nama Pesawat..." name="name" id="name" defaultValue={props.name} />
        {state?.status === "error" && state.errors?.name ? (
          <div className="text-rose-700 text-sm">{state.errors.name}</div>
        ) : null}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="image">Upload Foto Pesawat</Label>
        <Input placeholder="Upload Foto Pesawat..." name="image" id="image" type="file" />
        {state?.status === "error" && state.errors && "image" in state.errors ? (
          <div className="text-rose-700 text-sm"> {typeof state.errors.image === "string" ? state.errors.image : null}</div>
        ) : null}
      </div>
      <EditAirplaneButton />
      {state?.status === "success" ? (
        <div className="bg-green-300 text-sm text-center rounded-lg h-10 px-4 py-2 text-green-700">{state.message}</div>
      ) : null}
      {state?.status === "error" && state.message !== "" ? (
        <div className="bg-rose-300 text-sm text-center rounded-lg h-10 px-4 py-2 text-rose-700">{state.message}</div>
      ) : null}
    </form>
  );
}

function EditAirplaneButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending && <LoaderCircle className="animate-spin w-4 h-4 flex-shrink-0 mr-1" />} Submit
    </Button>
  );
}
