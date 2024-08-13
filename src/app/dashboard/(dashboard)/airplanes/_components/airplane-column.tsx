"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Airplane } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { getUploadFile } from "@/lib/supabase";
import DeleteAirplaneButton from "./delete-airplane-button";

export const airplaneColumns: ColumnDef<Airplane>[] = [
  {
    accessorKey: "image",
    header: "Image",
    maxSize: 180,
    cell: ({ row }) => {
      const airplane = row.original;
      return (
        <Image
          src={getUploadFile(airplane.image as string)}
          alt={airplane.name}
          width={180}
          height={180}
          className="rounded-md object-cover"
        />
      );
    },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const airplane = row.original;

      return (
        <div className="inline-flex gap-5 items-center">
          <Button variant={"secondary"} size={"sm"} asChild>
            <Link href={"/dashboard/airplanes/edit/" + airplane.id}>
              <Pencil className="flex-shrink-0 mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DeleteAirplaneButton id={airplane.id} />
        </div>
      );
    },
  },
];
