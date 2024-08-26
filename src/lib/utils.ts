import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
import { Prisma } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    message = `${error.code}:${error.message} `;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else {
    message = error ? String(error) : "An error occurred";
  }
  return message;
};

export function getDiscountAmount(
  price: number,
  quantity: number = 1,
  discountInPercent: number = 0
) {
  return (price * quantity * discountInPercent) / 100;
}

export function gettaxAmount(
  price: number,
  quantity: number = 1,
  taxPercentage: number = 18,
  discount: number = 0
) {
  return quantity * (price - discount) * (taxPercentage / 100);
}

export function getSubTotalAmount(
  price: number,
  quantity: number = 1,
  discount: number = 0
) {
  return quantity * (price - discount);
}

export function getTotalAmount(
  price: number,
  quantity: number = 1,
  tax: number = 0,
  discount: number = 0
) {
  return quantity * price - discount + tax;
}

export function getFormattedDate(date: Date) {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
export function getFormattedDateTime(date: Date) {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
export function getFormattedTime(date: Date) {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "numeric",
  });
}
export function getFormattedCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

const secretKey = process.env.APP_SECRET_KEY
  ? process.env.APP_SECRET_KEY
  : "creative1";
export const encrypt = (plainText: string) => {
  const cipherText = CryptoJS.AES.encrypt(plainText, secretKey).toString();
  return cipherText;
};

export const decrypt = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  const plainText = bytes.toString(CryptoJS.enc.Utf8);
  return plainText;
};
export function generateToken(length: number) {
  return crypto.randomBytes(length).toString("hex");
}
