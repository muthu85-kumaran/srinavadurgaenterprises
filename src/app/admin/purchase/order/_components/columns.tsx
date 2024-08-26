"use client";

import Link from "next/link";
import { LucideEdit2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { PurchaseOrder } from "@/actions/purchaseOrderAction";
import { getFormattedCurrency, getFormattedDateTime } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { OrderStatusCode, PaymentStatusEnum } from "@prisma/client";

export const columns: ColumnDef<PurchaseOrder>[] = [
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const salesorder = row.original;

      return (
        <Link href={`/admin/sales/order/${salesorder.id}`}>
          <LucideEdit2 className="w-4 h-4 mr-2" />
        </Link>
      );
    },
  },
  {
    header: "Order No",
    accessorKey: "orderNo",
    cell: ({ row }) => <div className="">{row.getValue("orderNo")}</div>,
  },
  {
    header: "Order Date",
    accessorKey: "orderDate",
    cell: ({ row }) => {
      const salesorder = row.original;
      return (
        <div className="">
          <p>{getFormattedDateTime(new Date(salesorder.orderDate))}</p>
        </div>
      );
    },
  },
  {
    header: "Status of the Order",
    accessorKey: "status",
    cell: ({ row }) => {
      const salesorder = row.original;
      const status = salesorder.orderStatus;
      return (
        <div className="flex flex-col gap-2">
          {status.map((item, index) => (
            <div key={index}>
              {item.statusCode === OrderStatusCode.PENDING ? (
                <div className=" text-yellow-800 px-2 py-1 rounded flex flex-col gap-2">
                  <span>{item.statusCode}</span>
                  <span>{getFormattedDateTime(item.statusDate)}</span>
                </div>
              ) : item.statusCode === OrderStatusCode.CONFIRMED ? (
                <div className=" text-green-800 px-2 py-1 rounded flex flex-col gap-2">
                  <span>{item.statusCode}</span>
                  {getFormattedDateTime(item.statusDate)}
                </div>
              ) : item.statusCode === OrderStatusCode.CANCELLED ? (
                <span className=" text-red-800 px-2 py-1 rounded">
                  {item.statusCode} - {getFormattedDateTime(item.statusDate)}
                </span>
              ) : item.statusCode === OrderStatusCode.INVOICED ? (
                <span className=" text-blue-800 px-2 py-1 rounded">
                  {item.statusCode} - {getFormattedDateTime(item.statusDate)}
                </span>
              ) : item.statusCode === OrderStatusCode.DELIVERED ? (
                <span className=" text-green-800 px-2 py-1 rounded">
                  {item.statusCode} - {getFormattedDateTime(item.statusDate)}
                </span>
              ) : item.statusCode === OrderStatusCode.RETURNED ? (
                <span className=" text-red-800 px-2 py-1 rounded">
                  {item.statusCode} - {getFormattedDateTime(item.statusDate)}
                </span>
              ) : item.statusCode === OrderStatusCode.PARTIALLY_RETURNED ? (
                <span className=" text-blue-800 px-2 py-1 rounded">
                  {item.statusCode} - {getFormattedDateTime(item.statusDate)}
                </span>
              ) : (
                <span className=" text-blue-800 px-2 py-1 rounded">
                  {item.statusCode} - {getFormattedDateTime(item.statusDate)}
                </span>
              )}
            </div>
          ))}
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
    header: "Vendor",
    accessorKey: "vendor",
    cell: ({ row }) => {
      const salesorder = row.original;
      const customer = salesorder.vendor;
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
      const salesorder = row.original;
      const billingAddress = salesorder.billingAddress;
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
    header: "Order Items",
    accessorKey: "orderItems",
    cell: ({ row }) => {
      const salesorder = row.original;
      const orderItems = salesorder.orderItems;
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
            {orderItems.map((item, index) => (
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
      const salesorder = row.original;
      const shippingAddress = salesorder.shippingAddress;
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
    accessorKey: "orderGrossAmount",
    cell: ({ row }) => (
      <div className="">
        {getFormattedCurrency(row.getValue("orderGrossAmount"))}
      </div>
    ),
  },
  {
    header: "Total Amount",
    accessorKey: "orderTotalAmount",
    cell: ({ row }) => (
      <div className="">
        {getFormattedCurrency(row.getValue("orderTotalAmount"))}
      </div>
    ),
  },
];
