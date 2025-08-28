import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from 'vue3-toastify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ToastType = "success" | "error" | "info" | "warning";

export function showToast(message: string, type: ToastType = "info") {

switch (type) {
    case "success":
      toast.success(message, {
        position: "bottom-right"
      });
        break;
    case "error":
      toast.error(message, {
        position: "bottom-right"
    });
        break;
    case "info":
    toast.info(message, {
        position: "bottom-right"
    });
        break;
    case "warning":
      toast.warning(message, {
        position: "bottom-right"
    });
        break;
  }
}
