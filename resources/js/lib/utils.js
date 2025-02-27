import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const FINEPAYMENTSTATUS = {
    PENDING: "TERTUNDA",
    SUCCESS: "Sukses",
    FAILED: "Gagal",
};
