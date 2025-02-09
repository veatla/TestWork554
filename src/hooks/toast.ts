import { useStore } from "@/model";

export type ToastType = {
    id: string;
    status: "success" | "error" | "warning" | "info";
    content: string;
    duration: number;
};

export const addToast = (toast: string, status: ToastType["status"] = "info", duration = 4000) => {
    useStore.getState().toasts.add({
        id: Math.random().toString(36).substring(2, 9),
        content: toast,
        duration: duration,
        status,
    });
};

export const deleteToast = (toast: string) => {
    useStore.getState().toasts.delete(toast);
};
