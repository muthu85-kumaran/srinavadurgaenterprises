"use client";
import { ArrowUpDown, LucideEdit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PaymentMode } from "@/types/PaymentMode";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PaymentMode>[] = [
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const phase = row.original;

      return (
        <Link href={`/admin/paymentmode/${phase.id}`}>
          <LucideEdit2 className="w-4 h-4 mr-2" />
        </Link>
      );
    },
  },

  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Delivery In MM
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableHiding: false,

    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    accessorKey: "name",
    accessorFn: (row) => row.name,
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => {
      const phase = row.original;
      return <div>{phase.description}</div>;
    },
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const phase = row.original;
      return <div>{new Date(phase.createdAt ?? "").toLocaleDateString()}</div>;
    },
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      const phase = row.original;
      return <div>{new Date(phase.updatedAt ?? "").toLocaleDateString()}</div>;
    },
  },
];
