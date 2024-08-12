import React from "react";

export default function DashboardNavbar() {
  return (
    <section className="fixed top-0 w-screen bg-white z-30">
      <nav className="border-b border-muted p-5">
        <div className="flex flex-row items-center justify-between">
          <span className="font-bold text-primary">Flysha Dashboard</span>
        </div>
      </nav>
    </section>
  );
}
