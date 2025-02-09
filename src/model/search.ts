import { AppStateCreator } from "./index";
import EntityAdapter, { Entities } from "../utils/entityAdapter";
import { City } from "../types/city";
import request from "@/api/base";

export interface SearchStore {
    entities: Entities<City, "id">;
    search: (q: string) => void;
    clear: () => void;
}

export const searchStore: AppStateCreator<SearchStore> = (set) => ({
    entities: EntityAdapter.create([], "id"),
    search: async (q) => {
        if (q.length < 3) return;
        const result = await request.search_city(q, 5);
        if (!result) return;

        const cities: Array<City> = [];
        if (result.status === 200) {
            for (let i = 0; i < result.data.length; i++) {
                const city = result.data[i];
                city.id = `${city.lat},${city.lon}`;
                cities.push(city);
            }
        }

        set((store) => {
            EntityAdapter.delete_all(store.search.entities);

            if (cities.length) {
                EntityAdapter.add_many(store.search.entities, cities);
            }
        });
    },
    clear: () => {
        set(store => {
            EntityAdapter.delete_all(store.search.entities);
        })
    }
});
