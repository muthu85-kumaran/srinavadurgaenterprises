"use client";

import Link from "next/link";
import { Divide, LucideEdit2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { getFormattedDateTime } from "@/lib/utils";
import { SalesInvoice } from "@/actions/sales/SalesInvoiceAction";
import { getFormattedCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaymentStatusEnum } from "@prisma/client";

export const columns: ColumnDef<SalesInvoice>[] = [
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const salesInvoice = row.original;

      return (
        <Link href={`/admin/sales/${salesInvoice.id}`}>
          <LucideEdit2 className="w-4 h-4 mr-2" />
        </Link>
      );
    },
  },
  {
    header: "Invoice No",
    accessorKey: "invoiceNo",
    cell: ({ row }) => <div className="">{row.getValue("invoiceNo")}</div>,
  },

  {
    header: "Invoice Date",
    accessorKey: "invoiceDate",
    cell: ({ row }) => {
      const salesInvoice = row.original;
      return (
        <div className="">
          <p>{getFormattedDateTime(new Date(salesInvoice.invoiceDate))}</p>
        </div>
      );
    },
  },
  {
    header: "Customer",
    accessorKey: "customer",
    cell: ({ row }) => {
      const salesInvoice = row.original;
      const customer = salesInvoice.customer;
      return (
        <div className="">
          <p>{customer?.name}</p>
          <p>{customer?.contactNo}</p>
          <p>{customer?.email}</p>
        </div>
      );
    },
  },
  {
    header: "Billing Address",
    accessorKey: "billingAddress",
    cell: ({ row }) => {
      const salesInvoice = row.original;
      const billingAddress = salesInvoice.billingAddress;
      return (
        <div className="">
          <p>{billingAddress?.name}</p>
          <p>{billingAddress?.contactNo}</p>
          <p>{billingAddress?.address}</p>
          <p>{billingAddress?.city}</p>
          <p>
            {billingAddress?.state}-{billingAddress?.pincode}
          </p>
          <p>{billingAddress?.country}</p>
        </div>
      );
    },
  },
  {
    header: "Payment Mode",
    accessorKey: "paymentMode",
    cell: ({ row }) => {
      const salesInvoice = row.original;
      const paymentMode = salesInvoice.paymentMode;
      return (
        <div className="">
          <p>{paymentMode?.name}</p>
        </div>
      );
    },
  },
  {
    header: "Payment Status",
    accessorKey: "paymentStatus",
    cell: ({ row }) => {
      const salesInvoice = row.original;

      return (
        <div className="font-semibold">
          {salesInvoice.paymentStatus == PaymentStatusEnum.PAID ? (
            <div className="text-green-800">{salesInvoice.paymentStatus}</div>
          ) : salesInvoice.paymentStatus == PaymentStatusEnum.PENDING ? (
            <div className="text-orange-600">{salesInvoice.paymentStatus}</div>
          ) : salesInvoice.paymentStatus == PaymentStatusEnum.PARTIALLY_PAID ? (
            <div className="text-yellow-600">{salesInvoice.paymentStatus}</div>
          ) : (
            <div className="text-red-800">{salesInvoice.paymentStatus}</div>
          )}
        </div>
      );
    },
  },
  {
    header: "Invoice Items",
    accessorKey: "InvoiceItems",
    cell: ({ row }) => {
      const salesInvoice = row.original;
      const InvoiceItems = salesInvoice.invoiceItems;
      return (
        <Table className="">
          <TableHeader className="flex gap-2 border p-2 font-semibold">
            <TableRow className="flex gap-2 border p-2 font-semibold">
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Tax</TableCell>
              <TableCell>Sub Total</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {InvoiceItems.map((item, index) => (
              <TableRow key={index} className="flex gap-2 flex-grow border p-2">
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.quantity}Nos</TableCell>
                <TableCell>{getFormattedCurrency(item.price)}</TableCell>
                <TableCell>
                  {getFormattedCurrency(item.discountAmount)}
                </TableCell>
                <TableCell>{item.product.productTax?.taxInPercent}%</TableCell>
                <TableCell>
                  {getFormattedCurrency(item.subTotalAmount)}
                </TableCell>
                <TableCell>{getFormattedCurrency(item.totalAmount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    },
  },
  {
    header: "Shipping Address",
    accessorKey: "shippingAddress",
    cell: ({ row }) => {
      const salesInvoice = row.original;
      const shippingAddress = salesInvoice.shippingAddress;
      return (
        <div className="">
          <p>{shippingAddress?.name}</p>
          <p>{shippingAddress?.contactNo}</p>
          <p>{shippingAddress?.address}</p>
          <p>{shippingAddress?.city}</p>
          <p>
            {shippingAddress?.state}-{shippingAddress?.pincode}
          </p>
          <p>{shippingAddress?.country}</p>
        </div>
      );
    },
  },
  {
    header: "Gross Amount",
    accessorKey: "invoiceGrossAmount",
    cell: ({ row }) => (
      <div className="">{row.getValue("invoiceGrossAmount")}</div>
    ),
  },
  {
    header: "Total Amount",
    accessorKey: "invoiceTotalAmount",
    cell: ({ row }) => (
      <div className="">{row.getValue("invoiceTotalAmount")}</div>
    ),
  },
];
