"use client";

import { Input } from "@/app/_components/ui/input";
import Link from "next/link";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signUpUserAction } from "./action";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/app/_components/ui/use-toast";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";

export default function FormSignUp() {
  const [state, formAction] = useFormState(signUpUserAction, null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state?.status === "success") {
      formRef.current?.reset();
      toast({
        title: "Success",
        description: state.message,
      });
      router.push("/sign-in");
    }
    if (state?.status === "error") {
      toast({
        title: "Error",
        description: state.message,
      });
    }
  }, [state?.message, state?.status, state?.errors, toast, router]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="bg-white text-flysha-black w-[500px] flex flex-col rounded-[20px] gap-5 p-5"
    >
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">
            Complete Name
          </label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Write your name"
            className="rounded-full w-full p-[12px_20px]  bg-[#EDE8F5] appearance-none outline-none font-semibold focus-visible:ring-2 focus-visible:ring-flysha-light-purple"
          />
          {state?.status === "error" && state.errors?.name ? (
            <div className="text-rose-700 text-sm">{state.errors.name}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="passport" className="font-medium">
            No. Passport
          </label>
          <Input
            type="text"
            name="passport"
            id="passport"
            placeholder="Write passport number"
            className="rounded-full w-full p-[12px_20px]  bg-[#EDE8F5] appearance-none outline-none font-semibold focus-visible:ring-2 focus-visible:ring-flysha-light-purple"
          />
          {state?.status === "error" && state.errors?.passport ? (
            <div className="text-rose-700 text-sm">{state.errors.passport}</div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-medium">
          Email Address
        </label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Write your email"
          className="rounded-full w-full p-[12px_20px]  bg-[#EDE8F5] appearance-none outline-none font-semibold focus-visible:ring-2 focus-visible:ring-flysha-light-purple"
        />
        {state?.status === "error" && state.errors?.email ? (
          <div className="text-rose-700 text-sm">{state.errors.email}</div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Type your password"
          className="rounded-full w-full p-[12px_20px]  bg-[#EDE8F5] appearance-none outline-none font-semibold focus-visible:ring-2 focus-visible:ring-flysha-light-purple"
        />
        {state?.status === "error" && state.errors?.password ? (
          <div className="text-rose-700 text-sm">{state.errors.password}</div>
        ) : null}
      </div>
      <SubmitButton />
      {state?.status === "success" ? (
        <div className="bg-green-300 text-sm text-center rounded-lg h-10 px-4 py-2 text-green-700">{state.message}</div>
      ) : null}
      {state?.status === "error" && state.message !== "" ? (
        <div className="bg-rose-300 text-sm text-center rounded-lg h-10 px-4 py-2 text-rose-700">{state.message}</div>
      ) : null}
      <Link
        href="/signin"
        className="text-center text-flysha-black hover:text-white rounded-full bg-white hover:bg-flysha-black font-semibold w-full p-[12px_30px] border border-flysha-black transition-all duration-300"
      >
        Sign In
      </Link>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="text-center text-flysha-black rounded-full bg-flysha-light-purple font-bold w-full p-[12px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF] disabled:opacity-40"
    >
      {pending && <LoaderCircle className="animate-spin w-4 h-4 flex-shrink-0 mr-1" />} Create New Account
    </Button>
  );
}
