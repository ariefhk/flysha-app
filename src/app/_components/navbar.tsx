import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavbarAuth from "./navbar-auth";

export default function Navbar() {
  return (
    <nav id="Navbar" className="container max-w-[1130px] mx-auto flex justify-between items-center pt-[30px]">
      <Link href="/" className="flex items-center shrink-0">
        <Image width={120} height={60} src="/images/logos/logo.svg" alt="logo" />
      </Link>
      <ul className="nav-menus flex gap-[30px] items-center w-fit">
        <li>
          <Link href="" className="font-medium text-white hover:underline hover:underline-offset-4">
            Flash Sale
          </Link>
        </li>
        <li>
          <Link href="" className="font-medium text-white hover:underline hover:underline-offset-4">
            Discover
          </Link>
        </li>
        <li>
          <Link href="" className="font-medium text-white hover:underline hover:underline-offset-4">
            Packages
          </Link>
        </li>
        <li>
          <Link href="" className="font-medium text-white hover:underline hover:underline-offset-4">
            Stories
          </Link>
        </li>
        <li>
          <Link href="" className="font-medium text-white hover:underline hover:underline-offset-4">
            About
          </Link>
        </li>
        <NavbarAuth />
      </ul>
    </nav>
  );
}
