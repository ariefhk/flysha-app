import CompanyLogos from "@/app/_components/company-logos";
import Navbar from "@/app/_components/navbar";
import React from "react";

export default function AuthLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <section
      id="Signup"
      className="bg-[url('/images/background/airplane.png')] bg-no-repeat bg-cover bg-left-top -z-10 min-h-screen"
    >
      <div className="Header-content bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)] z=0 min-h-screen">
        <Navbar />
        <div className="flex flex-col justify-between min-h-[calc(100vh-78px)]">
          {children}
          <CompanyLogos />
        </div>
      </div>
    </section>
  );
}
