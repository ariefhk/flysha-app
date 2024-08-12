"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { BookOpenCheck, Plane, Ticket, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import DashboardLogout from "./dashboard-logout";
import { cn } from "@/lib/cn";

const urlData = [
  {
    name: "Airplanes",
    urlPaths: "/dashboard/airplanes",
    Icon: Plane,
  },
  {
    name: "Flights",
    urlPaths: "/dashboard/flights",
    Icon: BookOpenCheck,
  },
  {
    name: "Tickets",
    urlPaths: "/dashboard/tickets",
    Icon: Ticket,
  },
  {
    name: "Users",
    urlPaths: "/dashboard/users",
    Icon: User,
  },
];

export default function DashboardLink() {
  const pathname = usePathname();

  return (
    <>
      <div className="space-y-2">
        <Button
          variant={"ghost"}
          asChild
          className={cn("w-full justify-start", {
            "bg-flysha-bg-purple text-white": pathname === "/dashboard",
          })}
        >
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
      <div className="space-y-2">
        <div className="uppercase text-xs font-bold">Master Data</div>
        {urlData.map((ctx, index) => {
          // generate icon
          const Icon = ctx.Icon;

          // Check if the current path matches the URL path for this specific item
          const isActive = pathname.startsWith(ctx.urlPaths);

          return (
            <Button
              key={index + 1}
              variant={"ghost"}
              asChild
              className={cn("w-full justify-start ", {
                "bg-flysha-bg-purple text-white": isActive,
              })}
            >
              <Link href={ctx.urlPaths}>
                <Icon className="mr-2 w-4 h-4 flex-shrink-0" /> {ctx.name}
              </Link>
            </Button>
          );
        })}
      </div>
      <div className="space-y-2">
        <DashboardLogout />
      </div>
    </>
  );
}
