import { RequestKeys } from "@/api/base";
import { AppStateCreator } from "./index";

export type FetchState = {
    controllers: Record<RequestKeys, AbortController>;
    fetching: Record<RequestKeys, boolean>;

    start_fetching: (key: RequestKeys, controller: AbortController) => void;
    stop_fetching: (key: RequestKeys) => void;
    cancel_request: (key: RequestKeys) => void;
};

export const fetchStore: AppStateCreator<FetchState> = (set, get) => ({
    controllers: <Record<RequestKeys, AbortController>>{},
    fetching: <Record<RequestKeys, boolean>>{},

    start_fetching: (key, controller) => {
        set((state) => {
            state.fetch.controllers[key] = controller;
            state.fetch.fetching[key] = true;
        });
    },

    stop_fetching: (key) => {
        set((state) => {
            state.fetch.fetching[key] = false;
        });
    },

    cancel_request: (key) => {
        const controller = get().fetch.controllers[key];
        if (controller) {
            controller.abort();
            set((state) => {
                delete state.fetch.controllers[key];
                state.fetch.fetching[key] = false;
            });
        }
    },
});
