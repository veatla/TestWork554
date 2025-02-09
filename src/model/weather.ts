import { AppStateCreator } from "./index";
import EntityAdapter, { Entities } from "../utils/entityAdapter";
import { Forecast } from "../types/forecast";
// import request from "@/api/base";
import { WeatherData } from "../types/weather";
import request from "@/api/base";

export interface WeatherStore {
    forecast: Entities<Forecast, "id">;
    weather: Entities<WeatherData, "id">;

    /** Load City Weather */
    load_weather: (lat: number, lon: number) => void;

    /** Load Forecast Hourly */
    load_forecast: (lat: number, lon: number) => void;
}

export const weatherStore: AppStateCreator<WeatherStore> = (set) => ({
    forecast: EntityAdapter.create([], "id"),
    weather: EntityAdapter.create([], "id"),

    load_weather: async (lat, lon) => {
        const weather_response = await request.currentWeather(lat, lon);
        if (!weather_response || !weather_response.data) return;
        const city = `${lat},${lon}`;

        set((store) => {
            weather_response.data.id = city;

            EntityAdapter.upsert(store.cities.entities, {
                country: "",
                id: city,
                lat: lat,
                lon: lon,
                local_names: [],
                name: weather_response.data.name,
                state: null,
            });
            EntityAdapter.add(store.weather.weather, weather_response.data);
        });
    },

    load_forecast: async (lat, lon) => {
        const city = `${lat},${lon}`;
        const hourly_response = await request.forecast(lat, lon);
        if (!hourly_response) return;

        set((store) => {
            hourly_response.data.id = city;
            EntityAdapter.add(store.weather.forecast, <Forecast>(<unknown>hourly_response.data));
        });
    },
});
