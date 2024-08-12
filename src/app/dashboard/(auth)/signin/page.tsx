import { Metadata } from "next";
import SignInForm from "./form";

export const metadata: Metadata = {
  title: "Dashboard | Sign In",
};

export default function SignInPage() {
  return (
    <div className="w-full h-screen ">
      <div className="flex min-h-full flex-1  flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
