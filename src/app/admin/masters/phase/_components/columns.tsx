"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Phase } from "@/types/phase";
import { ArrowUpDown, ChevronDown, LucideEdit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<Phase>[] = [
  {
    header: "Id",
    accessorKey: "id",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableHiding: false,

    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },

  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const phase = row.original;
      return <div>{new Date(phase.createdAt ?? "").toLocaleDateString()}</div>;
      //
    },
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      const phase = row.original;
      return <div>{new Date(phase.updatedAt ?? "").toLocaleDateString()}</div>;
      //
    },
  },

  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const phase = row.original;

      return (
        <Link href={`/admin/masters/phase/${phase.id}`}>
          <LucideEdit2 className="w-4 h-4 mr-2" />
        </Link>
      );
    },
  },
];
