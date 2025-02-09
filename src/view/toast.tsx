"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { deleteToast } from "@/hooks/toast";
import { useStore } from "@/model";
import { Toast } from "bootstrap";

export const ToastContainer: React.FC = () => {
    const toasts = useStore((store) => store.toasts.toasts.ids);

    const removeToast = useCallback((id: string) => {
        deleteToast(id);
    }, []);

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            {toasts.map((toast) => (
                <ToastItem key={toast} id={toast} onClose={() => removeToast(toast)} />
            ))}
        </div>
    );
};
const statusClasses = {
    success: "bg-success text-white",
    error: "bg-danger text-white",
    warning: "bg-warning text-dark",
    info: "bg-info text-white",
};

export interface ToastItemProps {
    onClose: () => void;
    id: string;
}

const ToastItem: React.FC<ToastItemProps> = memo(
    ({ id, onClose }) => {
        const { duration, content, status } = useStore((store) => store.toasts.toasts.entities[id]);

        const toastRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const element = toastRef.current;
            if (!element) return;
            const toast = new Toast(element, {
                delay: duration,
            });

            toast.show();

            const handleHidden = () => {
                onClose();
            };

            element.addEventListener("hidden.bs.toast", handleHidden);

            return () => {
                element?.removeEventListener("hidden.bs.toast", handleHidden);
            };
        }, [duration, onClose]);

        return (
            <div ref={toastRef} className={`toast`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className={`toast-header ${statusClasses[status]}`}>
                    <strong className="me-auto text-capitalize">{status}</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">{content}</div>
            </div>
        );
    },

    // Check for ids equality
    // Otherwise it's gonna rerender all the time
    // when we add another toast
    (a, b) => a.id === b.id,
);

ToastItem.displayName = "ToastItem";
