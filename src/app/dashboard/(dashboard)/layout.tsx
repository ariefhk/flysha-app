import DashboardNavbar from "../_components/dashboard-navbar";
import { checkAdmin } from "@/lib/auth";
import DashboardLink from "../_components/dashboard-link";

export default async function DashboardLayout({ children }: Readonly<React.PropsWithChildren>) {
  // check Admin Session
  await checkAdmin();

  return (
    <main className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <DashboardNavbar />
      <section className="w-full flex-none md:w-64 h-full shadow p-5 space-y-5 md:pt-[80px]">
        <DashboardLink />
      </section>
      <section className="flex-grow md:overflow-y-auto p-5 md:pt-[80px]">{children}</section>
    </main>
  );
}
