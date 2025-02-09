import { AppStateCreator } from "./index";
import EntityAdapter, { Entities } from "../utils/entityAdapter";
import { City, FavoriteCity } from "../types/city";
import request from "@/api/base";

export interface CitiesStore {
    entities: Entities<City, "id">;
    favorites: Entities<FavoriteCity, "id">;
    active: string | null;
    toggle_favorite: (lat: number, lon: number) => void;
    get_favorites: () => void;
}

export const citiesStore: AppStateCreator<CitiesStore> = (set) => ({
    entities: EntityAdapter.create([], "id"),
    favorites: EntityAdapter.create([], "id"),

    active: null,

    set_active: (id: string | null) => {
        set((store) => {
            store.cities.active = id;
        });
    },

    set_favorite: (id: string) => {
        set((store) => {
            store.cities.active = id;
        });
    },

    get_favorites: async () => {
        const toggle = await request.get_favorite();
        if (!toggle) return;
        set((store) => {
            EntityAdapter.add_many(store.cities.favorites, toggle.data.favorites);
            EntityAdapter.add_many(store.weather.weather, toggle.data.weather);
        });
    },

    toggle_favorite: async (lat, lon) => {
        const toggle = await request.toggle_favorite(lat, lon);
        if (!toggle) return;

        set((store) => {
            const id = `${lat},${lon}`;
            const city = store.cities.entities.entities[id];
            if (toggle.data.status === "added") {
                EntityAdapter.add(store.cities.favorites, city);
            } else {
                EntityAdapter.delete(store.cities.favorites, id);
            }
        });
    },
});
