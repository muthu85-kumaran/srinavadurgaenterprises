"use client";
import { ArrowUpDown, LucideEdit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Customer } from "@/types/Customer";
import { ColumnDef } from "@tanstack/react-table";
export const columns: ColumnDef<Customer>[] = [
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const phase = row.original;

      return (
        <Link href={`/admin/customer/${phase.id}`}>
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
          Customer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableHiding: false,

    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    accessorKey: "name",
  },
  {
    header: "Company Name",
    accessorKey: "companyName",
    cell: ({ row }) => <div className="">{row.getValue("companyName")}</div>,
  },
  {
    header: "Contact Number",
    accessorKey: "contactNo",
    cell: ({ row }) => <div className="">{row.getValue("contactNo")}</div>,
  },
  {
    header: "E-Mail",
    accessorKey: "email",
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
  },
  {
    header: "GSTIN",
    accessorKey: "gstin",
    cell: ({ row }) => <div className="">{row.getValue("gstin")}</div>,
  },
  {
    header: "PAN",
    accessorKey: "pan",
    cell: ({ row }) => <div className="">{row.getValue("pan")}</div>,
  },
  {
    header: "Balance Type",
    accessorKey: "balanceType",
    cell: ({ row }) => <div className="">{row.getValue("balanceType")}</div>,
  },
  {
    header: "Opening Balance",
    accessorKey: "openingBalance",
    cell: ({ row }) => <div className="">{row.getValue("openingBalance")}</div>,
  },
  {
    header: "Address",
    accessorKey: "address",
    cell: ({ row }) => <div className="">{row.getValue("address")}</div>,
  },
  {
    header: "City",
    accessorKey: "city",
    cell: ({ row }) => <div className="">{row.getValue("city")}</div>,
  },
  {
    header: "State",
    accessorKey: "state",
    cell: ({ row }) => <div className="">{row.getValue("state")}</div>,
  },
  {
    header: "Pincode",
    accessorKey: "pincode",
    cell: ({ row }) => <div className="">{row.getValue("pincode")}</div>,
  },
  {
    header: "Country",
    accessorKey: "country",
    cell: ({ row }) => <div className="">{row.getValue("country")}</div>,
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
      //
    },
  },
];
