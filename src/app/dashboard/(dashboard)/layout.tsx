import { Button } from "../../_components/ui/button";
import Link from "next/link";
import { BookOpenCheck, Plane, Ticket, User } from "lucide-react";
import DashboardNavbar from "../_components/dashboard-navbar";
import DashboardLogout from "../_components/dashboard-logout";
import { checkAdmin } from "@/lib/auth";

export default async function DashboardLayout({ children }: Readonly<React.PropsWithChildren>) {
  // check Admin Session
  await checkAdmin();

  return (
    <main className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <DashboardNavbar />
      <section className="w-full flex-none md:w-64 h-full shadow p-5 space-y-5 md:pt-[80px]">
        <div className="space-y-2">
          <Button variant={"ghost"} asChild className="w-full justify-start">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
        <div className="space-y-2">
          <div className="uppercase text-xs font-bold">Master Data</div>
          <Button variant={"ghost"} asChild className="w-full justify-start">
            <Link href="/dashboard/airplanes">
              <Plane className="mr-2 w-4 h-4 flex-shrink-0" /> Airplanes
            </Link>
          </Button>
          <Button variant={"ghost"} asChild className="w-full justify-start">
            <Link href="/dashboard/flights">
              <BookOpenCheck className="mr-2 w-4 h-4 flex-shrink-0" /> Flights
            </Link>
          </Button>
          <Button variant={"ghost"} asChild className="w-full justify-start">
            <Link href="/dashboard/tickets">
              <Ticket className="mr-2 w-4 h-4 flex-shrink-0" /> Tickets
            </Link>
          </Button>
          <Button variant={"ghost"} asChild className="w-full justify-start">
            <Link href="/dashboard/users">
              <User className="mr-2 w-4 h-4 flex-shrink-0" /> Users
            </Link>
          </Button>
        </div>
        <div className="space-y-2">
          <DashboardLogout />
        </div>
      </section>
      <section className="flex-grow md:overflow-y-auto p-5 md:pt-[80px]">{children}</section>
    </main>
  );
}
