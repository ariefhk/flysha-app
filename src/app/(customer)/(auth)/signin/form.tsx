"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";

import { signInUser } from "./action";
import Link from "next/link";
import { Input } from "@/app/_components/ui/input";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-center text-flysha-black rounded-full bg-flysha-light-purple font-bold w-full p-[12px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF] disabled:opacity-40"
    >
      Sign In
    </button>
  );
}

export default function FormSignIn() {
  const [state, formAction] = useFormState(signInUser, null);

  return (
    <form action={formAction} className="bg-white text-flysha-black w-[500px] flex flex-col rounded-[20px] gap-5 p-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-medium">
          Email Address
        </label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Write your email"
          className="rounded-full h-[48px] w-full p-[12px_20px] bg-[#EDE8F5] appearance-none outline-none font-semibold focus:ring-2 focus:ring-flysha-light-purple"
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
          className="rounded-full h-[48px] w-full p-[12px_20px]  bg-[#EDE8F5] appearance-none outline-none font-semibold focus:ring-2 focus:ring-flysha-light-purple"
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
        href="/signup"
        className="text-center text-flysha-black hover:text-white rounded-full bg-white hover:bg-flysha-black font-semibold w-full p-[12px_30px] border border-flysha-black transition-all duration-300"
      >
        Create New Account
      </Link>
    </form>
  );
}
