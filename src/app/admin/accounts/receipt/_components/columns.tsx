"use client";

import Link from "next/link";
import { LucideEdit2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { getFormattedCurrency, getFormattedDateTime } from "@/lib/utils";
import { ListReceiptType } from "@/actions/accounts/ReceiptAction";

export const columns: ColumnDef<ListReceiptType>[] = [
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const receipt = row.original;

      return (
        <Link href={`/admin/accounts/receipt/${receipt.id}`}>
          <LucideEdit2 className="w-4 h-4 mr-2" />
        </Link>
      );
    },
  },
  {
    header: "Reference No",
    accessorKey: "referenceNo",
    cell: ({ row }) => {
      const receipt = row.original;
      return <div className="">{receipt.referenceNo}</div>;
    },
  },
  {
    header: "Receipt Date",
    accessorKey: "receiptDate",
    cell: ({ row }) => {
      const receipt = row.original;
      return (
        <div className="">
          {getFormattedDateTime(new Date(receipt.receiptDate))}
        </div>
      );
    },
  },

  {
    header: "Customer",
    accessorKey: "customerName",
    cell: ({ row }) => {
      const receipt = row.original;
      const customer = receipt.customer;
      return (
        <div className="">
          <p>{customer?.name}</p>
        </div>
      );
    },
  },
  {
    header: "Customer Address",
    accessorKey: "customerName",
    cell: ({ row }) => {
      const receipt = row.original;
      const customer = receipt.customer;
      return (
        <div className="">
          <p>{customer?.contactNo}</p>
          <p>{customer?.email}</p>
        </div>
      );
    },
  },
  {
    header: "Payment Mode",
    accessorKey: "paymentMode",
    cell: ({ row }) => {
      const salesorder = row.original;
      const paymentMode = salesorder.paymentMode;
      return (
        <div className="">
          <p>{paymentMode?.name}</p>
        </div>
      );
    },
  },

  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => {
      const receipt = row.original;
      return (
        <div className="text-end">{getFormattedCurrency(receipt.amount)}</div>
      );
    },
  },
];
