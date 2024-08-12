"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { signInAction } from "./action";
import { LoaderCircle } from "lucide-react";

export default function SignInForm() {
  const [state, formAction] = useFormState(signInAction, null);

  return (
    <form action={formAction} className="space-y-3">
      <Input type="email" placeholder="Input your email..." name="email" defaultValue={state?.data.email} />
      {state?.status === "error" && state.errors?.email ? (
        <div className="text-rose-700 text-sm">{state.errors.email}</div>
      ) : null}
      <Input type="password" placeholder="Input your password..." name="password" defaultValue={state?.data.password} />
      {state?.status === "error" && state.errors?.password ? (
        <div className="text-rose-700 text-sm">{state.errors.password}</div>
      ) : null}
      <SubmitButton />
      {state?.status === "success" ? (
        <div className="bg-green-300 text-sm text-center rounded-lg h-10 px-4 py-2 text-green-700">{state.message}</div>
      ) : null}
      {state?.status === "error" && state.message !== "" ? (
        <div className="bg-rose-300 text-sm text-center rounded-lg h-10 px-4 py-2 text-rose-700">{state.message}</div>
      ) : null}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending && <LoaderCircle className="animate-spin w-4 h-4 flex-shrink-0 mr-1" />} Submit
    </Button>
  );
}
