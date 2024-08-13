import { User } from "@/services/user.service";
import React from "react";
import { userColumns } from "./_components/users-columns";
import { DataTable } from "@/app/_components/datatable";

export default async function DashboardUsersPage() {
  const users = await User.getAllCustomer();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="py-5 text-2xl font-bold">Users</div>
      </div>
      <DataTable columns={userColumns} data={users} />
    </>
  );
}
