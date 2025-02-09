import { AppStateCreator } from "./index";
import EntityAdapter, { Entities } from "../utils/entityAdapter";
import { ToastType } from "@/hooks/toast";

export interface ToastStore {
    toasts: Entities<ToastType, "id">;
    add: (toast: ToastType) => void;
    delete: (toast: string) => void;
}

export const toastStore: AppStateCreator<ToastStore> = (set) => ({
    toasts: EntityAdapter.create([], "id"),
    add(toast) {
        set((store) => {
            EntityAdapter.add(store.toasts.toasts, toast);
        });
    },
    delete(toast) {
        set((store) => {
            EntityAdapter.delete(store.toasts.toasts, toast);
        });
    },
});
