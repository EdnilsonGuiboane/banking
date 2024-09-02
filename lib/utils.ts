/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Seg')
    month: "short", // abbreviated month name (e.g., 'Out')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // usar 12-hour clock (true) ou 24-hour clock (false)
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Out')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "pt-MZ",
    dateTimeOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "pt-MZ",
    dateOptions
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: "MZN",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    address1: type === "sign-in" ? z.string().optional() : z.string().max(50),
    city: type === "sign-in" ? z.string().optional() : z.string().max(50),
    state: type === "sign-in" ? z.string().optional() : z.string().length(2),
    postalCode:
      type === "sign-in" ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === "sign-in" ? z.string().optional() : z.string().min(3),
    ssn: type === "sign-in" ? z.string().optional() : z.string().min(3),
    // both
    email: z.string().email(),
    password: z.string().min(8),
  });
