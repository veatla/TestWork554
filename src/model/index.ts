import { immer } from "zustand/middleware/immer";
import { create, StateCreator } from "zustand";
import { citiesStore, CitiesStore } from "./cities";
import { WeatherStore, weatherStore } from "./weather";
import { searchStore, SearchStore } from "./search";
import { FetchState, fetchStore } from "./fetch";
import { toastStore, ToastStore } from "./toast";

export interface AppStore {
    cities: CitiesStore;
    weather: WeatherStore;
    search: SearchStore;
    fetch: FetchState;
    toasts: ToastStore;
}
export type AppStateCreator<T> = StateCreator<AppStore, [["zustand/immer", never]], [], T>;

export const useStore = create<AppStore>()(
    immer((...args) => ({
        cities: citiesStore(...args),
        weather: weatherStore(...args),
        search: searchStore(...args),
        fetch: fetchStore(...args),
        toasts: toastStore(...args),
    })),
);
